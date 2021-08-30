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
    updatedAt: 0,
  },
  ADJ: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    isIConjugation: 1,
    createdAt: 0,
    updatedAt: 0,
  },
  OTHER: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    createdAt: 0,
    updatedAt: 0,
  },
  NOUN: {
    id: 0,
    word: 1,
    romaji: 1,
    sense: 1,
    createdAt: 0,
    updatedAt: 0,
  },
}

export const mainResourceFilterables = {
  VERB: ['GoDan', 'IchiDan', 'SuRu', 'KuRu', 'Transitive', 'Intransitive'],
  ADJ: ['I-Adj', 'Na-Adj'],
}

// TODO: fetch dynamically after switching to graphql
export const nounTags = {
  THINGS: {
    id: 1,
    color: 'kujakuishiGreen',
    name: 'THINGS',
  },
  ABSTRACT: {
    id: 2,
    color: 'sakuraPink',
    name: 'ABSTRACT',
  },
  LOCATION: {
    id: 3,
    color: 'mikanOrange',
    name: 'LOCATION',
  },
  TIME: {
    id: 4,
    color: 'kumoriBlue',
    name: 'TIME',
  },
  PEOPLE: {
    id: 5,
    color: 'yuzuYellow',
    name: 'PEOPLE',
  },
  OTHER: {
    id: 6,
    color: 'kooriBlue',
    name: 'OTHER',
  },
}

export const getWordGroupIconMatch = type => {
  switch (type) {
    case 'V5U':
    case 'V5K':
    case 'V5G':
    case 'V5S':
    case 'V5T':
    case 'V5M':
    case 'V5B':
    case 'V5N':
    case 'V5R':
      return {
        text: 'G',
        colorName: 'sakuraPink',
        value: 'GoDan',
      }

    case 'V1':
      return {
        text: 'I',
        colorName: 'kooriBlue',
        value: 'Ichidan',
      }
    case 'IRS':
      return {
        text: 'S',
        colorName: 'kujakuishiGreen',
        value: 'Irregular Suru',
      }
    case 'IRK':
      return {
        text: 'K',
        colorName: 'kujakuishiGreen',
        value: 'Irregular Kuru',
      }

    case 'TRANSITIVE':
      return {
        text: 'T',
        colorName: 'mikanOrange',
        value: 'Transitive',
      }
    case 'INTRANSITIVE':
      return {
        text: 'It',
        colorName: 'yuzuYellow',
        value: 'Intransitive',
      }

    case 'IADJ':
      return {
        text: 'I',
        colorName: 'sakuraPink',
        value: 'I-adjective',
      }
    case 'NAADJ':
      return {
        text: 'Na',
        colorName: 'kooriBlue',
        value: 'Na-adjective',
      }

    case nounTags.THINGS.name:
      return {
        text: 'T',
        colorName: nounTags.THINGS.color,
        value: nounTags.THINGS.name,
      }
    case nounTags.ABSTRACT.name:
      return {
        text: 'A',
        colorName: nounTags.ABSTRACT.color,
        value: nounTags.ABSTRACT.name,
      }
    case nounTags.LOCATION.name:
      return {
        text: 'L',
        colorName: nounTags.LOCATION.color,
        value: nounTags.LOCATION.name,
      }
    case nounTags.TIME.name:
      return {
        text: 'T',
        colorName: nounTags.TIME.color,
        value: nounTags.TIME.name,
      }
    case nounTags.PEOPLE.name:
      return {
        text: 'P',
        colorName: nounTags.PEOPLE.color,
        value: nounTags.PEOPLE.name,
      }
    case nounTags.OTHER.name:
      return {
        text: 'O',
        colorName: nounTags.OTHER.color,
        value: nounTags.OTHER.name,
      }

    default:
      return null
  }
}
