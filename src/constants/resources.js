export const mainResourceFields = {
  /*
  [type]: {
    [fieldName]: BoolList[
      isDisplayedInList,
      isFilterableInList
    ]
  }
  */
  VERB: {
    id: 0,
    word: 1,
    hiragana: 1,
    group: 1,
    sense: 1,
    stem: 0,
    teForm: 0,
    aDan: 0,
    eDan: 0,
    oDan: 0,
    isTransitive: 0,
    isIntransitive: 0,
    createdAt: 0,
    updatedAt: 0
  },
  ADJ: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    isIConjugation: 1,
    createdAt: 0,
    updatedAt: 0
  },
  OTHER: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    createdAt: 0,
    updatedAt: 0
  },
  NOUN: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    createdAt: 0,
    updatedAt: 0
  }
}

export const mainResourceFilterables = {
  VERB: ['GoDan', 'IchiDan', 'SuRu', 'KuRu', 'Transitive', 'Intransitive'],
  ADJ: ['I-Adj', 'Na-Adj']
}
