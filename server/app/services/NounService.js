const { Noun } = require('../models')
const { BaseService } = require('./BaseService')
const { InternalServiceError } = require('../constants/exceptions')
const { NounTagRelService } = require('../services/NounTagRelService')
const { NounTagService } = require('../services/NounTagService')

class NounService extends BaseService {
  model = Noun

  insertNoun = async ({ word, hiragana, sense, tagIds }) => {
    const newWord = await this.createAsync({
      fieldKV: {
        word,
        hiragana,
        sense
      }
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
            tagId: t
          }
        })
      )
    )

    return newWord
  }
}

module.exports = {
  NounService
}
