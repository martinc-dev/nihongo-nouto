export const verbPOSTypeMarkers = {
  'ichidan verb': 'V1',
  "godan verb with 'u' ending": 'V5U',
  "godan verb with 'ku' ending": 'V5K',
  'godan verb - iku/yuku special class': 'V5K',
  "godan verb with 'gu' ending": 'V5G',
  "godan verb with 'su' ending": 'V5S',
  "godan verb with 'tsu' ending": 'V5T',
  "godan verb with 'mu' ending": 'V5M',
  "godan verb with 'bu' ending": 'V5B',
  "godan verb with 'nu' ending": 'V5N',
  "godan verb with 'ru' ending": 'V5R',
  'suru verb': 'IRS',
  'kuru verb - special class': 'IRK',
  'kuru verb': 'IRK'
}

export const verbClassificationNaiveGuess = {
  う: 'V5U',
  く: 'V5K',
  ぐ: 'V5G',
  す: 'V5S',
  つ: 'V5T',
  む: 'V5M',
  ぶ: 'V5B',
  ぬ: 'V5N',
  る: 'V5R'
}

export const verbPOSTypeRegexMarkers = {
  V1: /ichidan/i,
  V5: /godan/i,
  IRS: /suru/i,
  IRK: /kuru/i
}

export const verbPOSTrMarkers = {
  'transitive verb': 'transitive',
  'intransitive verb': 'intransitive'
}

export const adjPOSTypeMarkers = {
  'i-adjective (keiyoushi)': 'IADJ',
  'na-adjective (keiyodoshi)': 'NAADJ'
}

export const adjTypes = {
  IADJ: 'IADJ',
  NAADJ: 'NAADJ'
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
        value: 'GoDan'
      }

    case 'V1':
      return {
        text: 'I',
        colorName: 'kooriBlue',
        value: 'Ichidan'
      }

    case 'IRS':
      return {
        text: 'S',
        colorName: 'kujakuishiGreen',
        value: 'Irregular Suru'
      }

    case 'IRK':
      return {
        text: 'K',
        colorName: 'kujakuishiGreen',
        value: 'Irregular Kuru'
      }

    case 'TRANSITIVE':
      return {
        text: 'T',
        colorName: 'mikanOrange',
        value: 'Transitive'
      }

    case 'INTRANSITIVE':
      return {
        text: 'It',
        colorName: 'yuzuYellow',
        value: 'Intransitive'
      }

    case 'IADJ':
      return {
        text: 'I',
        colorName: 'sakuraPink',
        value: 'I-adjective'
      }

    case 'NAADJ':
      return {
        text: 'Na',
        colorName: 'kooriBlue',
        value: 'Na-adjective'
      }

    default:
      return null
  }
}
