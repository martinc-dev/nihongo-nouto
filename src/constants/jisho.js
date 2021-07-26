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
