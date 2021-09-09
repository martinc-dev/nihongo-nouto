const { uniq } = require('lodash')
const { Noun } = require('../models')
const { BaseService } = require('./BaseService')
const { InternalServiceError } = require('../constants/exceptions')
const { NounTagRel } = require('../models')
const { NounTagRelService } = require('../services/NounTagRelService')
const { NounTagService } = require('../services/NounTagService')

class NounService extends BaseService {
  model = Noun
  queryOption = { include: [{ model: NounTagRel, as: 'nounTagRel' }] }

  insertNoun = async ({ word, hiragana, sense, tagIds }) => {
    const newWord = await this.createAsync({
      fieldKV: {
        word,
        hiragana,
        sense,
      },
    })
    const id = newWord?.dataValues?.id ?? 0

    if (!id)
      throw new InternalServiceError({ message: 'Cannot establish new noun record' })

    const nounTagRelService = new NounTagRelService()
    const nounTagService = new NounTagService()
    const allTagIds = (await nounTagService.queryAsync())?.rows ?? []
    const verifiedTagIds = tagIds.filter(
      t => t && allTagIds.map(k => k?.dataValues?.id ?? null).includes(t)
    )

    await Promise.all(
      verifiedTagIds.map(t =>
        nounTagRelService.createAsync({
          fieldKV: {
            nounId: id,
            tagId: t,
          },
        })
      )
    )

    return newWord
  }

  updateNoun = async ({ id, word, hiragana, sense, tagIds }) => {
    const result = await this.queryAsync({
      conditionKV: { id },
      options: this.queryOption,
    })

    if (!(result?.rows?.length ?? false))
      throw new InternalServiceError({ message: 'Cannot find record' })

    if (tagIds) {
      const nounTagRelIds = result.rows[0].dataValues.nounTagRel
        .map(t => t.dataValues?.tagId ?? null)
        .filter(t => t)
      const relIdsToDel = uniq(nounTagRelIds.filter(t => !tagIds.includes(t)))
      const relIdsToAdd = uniq(tagIds.filter(t => !nounTagRelIds.includes(t)))

      const nounTagRelService = new NounTagRelService()

      await Promise.all(
        relIdsToDel.map(t =>
          nounTagRelService.removeAsync({
            conditionKV: { nounId: id, tagId: t },
          })
        )
      )
      await Promise.all(
        relIdsToAdd.map(t =>
          nounTagRelService.createAsync({
            fieldKV: {
              nounId: id,
              tagId: t,
            },
          })
        )
      )
    }

    await this.updateAsync({
      fieldKV: {
        word,
        hiragana,
        sense,
      },
      conditionKV: { id },
      editableFields: this.editableFields,
    })

    return this.queryAsync({
      conditionKV: { id },
      options: this.queryOption,
    })
  }
}

module.exports = {
  NounService,
}
