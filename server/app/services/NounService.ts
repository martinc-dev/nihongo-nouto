import { uniq } from 'lodash'
import { Noun, NounTagRel, NounTag } from '../models'
import { BaseService } from './BaseService'
import { InternalServiceError } from '../constants/exceptions'
import { NounTagRelService } from './NounTagRelService'
import { NounTagService } from './NounTagService'

interface InsertNounParams {
  word: string
  hiragana: string
  sense: string
  tagIds?: number[]
}

interface UpdateNounParams {
  id: number
  word: string
  hiragana: string
  sense: string
  tagIds?: number[]
}

export class NounService extends BaseService {
  model = Noun
  queryOption = {
    include: [
      {
        model: NounTagRel,
        as: 'nounTagRel',
        include: [{ model: NounTag, as: 'nounTag' }],
      },
    ],
  }

  insertNoun = async ({ word, hiragana, sense, tagIds }: InsertNounParams) => {
    const newWord = await this.createAsync({
      fieldKV: {
        word,
        hiragana,
        sense,
      },
    })
    const id = (newWord?.dataValues as { id?: number })?.id ?? 0

    if (!id)
      throw new InternalServiceError({ message: 'Cannot establish new noun record' })

    const nounTagRelService = new NounTagRelService()
    const nounTagService = new NounTagService()
    const allTagIds = (await nounTagService.queryAsync())?.rows ?? []
    const verifiedTagIds =
      tagIds?.filter(
        t =>
          t &&
          allTagIds.map(k => (k?.dataValues as { id?: number })?.id ?? null).includes(t),
      ) ?? []

    await Promise.all(
      verifiedTagIds.map(t =>
        nounTagRelService.createAsync({
          fieldKV: {
            nounId: id,
            tagId: t,
          },
        }),
      ),
    )

    return newWord
  }

  updateNoun = async ({ id, word, hiragana, sense, tagIds }: UpdateNounParams) => {
    const result = await this.queryAsync({
      conditionKV: { id },
      options: this.queryOption,
    })

    if (!result || !(result.rows?.length ?? false))
      throw new InternalServiceError({ message: 'Cannot find record' })

    if (tagIds) {
      const nounTagRelIds = (
        (
          result.rows[0].dataValues as {
            nounTagRel?: Array<{ dataValues?: { tagId?: number } }>
          }
        )?.nounTagRel ?? []
      )
        .map(t => (t.dataValues as { tagId?: number })?.tagId ?? null)
        .filter((t): t is number => t !== null)
      const relIdsToDel = uniq(nounTagRelIds.filter(t => !tagIds.includes(t)))
      const relIdsToAdd = uniq(tagIds.filter(t => !nounTagRelIds.includes(t)))

      const nounTagRelService = new NounTagRelService()

      await Promise.all(
        relIdsToDel.map(t =>
          nounTagRelService.removeAsync({
            conditionKV: { nounId: id, tagId: t },
          }),
        ),
      )
      await Promise.all(
        relIdsToAdd.map(t =>
          nounTagRelService.createAsync({
            fieldKV: {
              nounId: id,
              tagId: t,
            },
          }),
        ),
      )
    }

    await this.updateAsync({
      fieldKV: {
        word,
        hiragana,
        sense,
      },
      conditionKV: { id },
      editableFields: ['word', 'hiragana', 'sense'],
    })

    return this.queryAsync({
      conditionKV: { id },
      options: this.queryOption,
    })
  }
}
