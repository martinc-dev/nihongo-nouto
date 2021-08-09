/* eslint-disable max-lines */
// Base on the work of Pomax's node-jp-conjugations
// Github: https://github.com/Pomax/node-jp-conjugations

const conjugationForms = [
  //  {  name: "plain affirmative", forms: ["う", "く", "ぐ", "す", "つ", "む", "ぶ", "ぬ", "る", "る"]  },
  // Present tense: 0-5
  {
    name: 'polite affirmative',
    forms: [
      'います',
      'きます',
      'ぎます',
      'します',
      'ちます',
      'みます',
      'びます',
      'にます',
      'ります',
      'ます',
      'します',
      'きます'
    ]
  },
  {
    name: 'plain negative',
    forms: [
      'わない',
      'かない',
      'がない',
      'さない',
      'たない',
      'まない',
      'ばない',
      'なない',
      'らない',
      'ない',
      'しない',
      'こない'
    ]
  },
  {
    name: 'polite negative',
    forms: [
      'いません',
      'きません',
      'ぎません',
      'しません',
      'ちません',
      'みません',
      'びません',
      'にません',
      'りません',
      'ません',
      'しません',
      'きません'
    ]
  },
  {
    name: 'curt negative (archaic)',
    forms: [
      'わん',
      'かん',
      'がん',
      'さん',
      'たん',
      'まん',
      'ばん',
      'なん',
      'らん',
      'ん',
      '?',
      '?'
    ]
  },
  {
    name: 'polite negative (archaic)',
    forms: [
      'いませぬ',
      'きませぬ',
      'ぎませぬ',
      'しませぬ',
      'ちませぬ',
      'みませぬ',
      'びませぬ',
      'にませぬ',
      'りませぬ',
      'ませぬ',
      '?',
      '?'
    ]
  },

  // Past tense: 6-9
  {
    name: 'past tense',
    forms: [
      'った',
      'いた',
      'いだ',
      'した',
      'った',
      'んだ',
      'んだ',
      'んだ',
      'った',
      'た',
      'した',
      'きた'
    ]
  },
  {
    name: 'polite affirmative',
    forms: [
      'いました',
      'きました',
      'ぎました',
      'しました',
      'ちました',
      'みました',
      'びました',
      'にました',
      'りました',
      'ました',
      'しました',
      'きました'
    ]
  },
  {
    name: 'plain negative',
    forms: [
      'わなかった',
      'かなかった',
      'がなかった',
      'さなかった',
      'たなかった',
      'まなかった',
      'ばなかった',
      'ななかった',
      'らなかった',
      'なかった',
      'しなかった',
      'こなかった'
    ]
  },
  {
    name: 'polite negative',
    forms: [
      'いませんでした',
      'きませんでした',
      'ぎませんでした',
      'しませんでした',
      'ちませんでした',
      'みませんでした',
      'びませんでした',
      'にませんでした',
      'りませんでした',
      'ませんでした',
      'しませんでした',
      'きませんでした'
    ]
  },

  // Perfect: 10
  {
    name: 'negative perfect',
    forms: [
      'わず(に)',
      'かず(に)',
      'がず(に)',
      'さず(に)',
      'たず(に)',
      'まず(に)',
      'ばず(に)',
      'なず(に)',
      'らず(に)',
      'ず(に)',
      '?',
      '?'
    ]
  },

  // Ta form: 11
  {
    name: 'representative',
    forms: [
      'ったり',
      'いたり',
      'いだり',
      'したり',
      'ったり',
      'んだり',
      'んだり',
      'んだり',
      'ったり',
      'たり',
      'したり',
      'きたり'
    ]
  },

  // Renyoukei: 12-13
  {
    name: 'conjunctive',
    forms: [
      'い-',
      'き-',
      'ぎ-',
      'し-',
      'ち-',
      'み-',
      'び-',
      'に-',
      'り-',
      '-',
      'し-',
      'き-'
    ]
  },
  {
    name: 'way of doing',
    forms: [
      'いかた',
      'きかた',
      'ぎかた',
      'しかた',
      'ちかた',
      'みかた',
      'びかた',
      'にかた',
      'りかた',
      'かた',
      '?',
      '?'
    ]
  },

  // Te forms: 14-22
  {
    name: 'te form',
    forms: [
      'って',
      'いて',
      'いで',
      'して',
      'って',
      'んで',
      'んで',
      'んで',
      'って',
      'て',
      'して',
      'きて'
    ]
  },
  {
    name: 'te iru',
    forms: [
      'っている',
      'いている',
      'いでいる',
      'している',
      'っている',
      'んでいる',
      'んでいる',
      'んでいる',
      'っている',
      'ている',
      'している',
      'きている'
    ]
  },
  {
    name: 'simplified te iru',
    forms: [
      'ってる',
      'いてる',
      'いでる',
      'してる',
      'ってる',
      'んでる',
      'んでる',
      'んでる',
      'ってる',
      'てる',
      'してる',
      'きてる'
    ]
  },
  {
    name: 'te aru',
    forms: [
      'ってある',
      'いてある',
      'いである',
      'してある',
      'ってある',
      'んである',
      'んである',
      'んである',
      'ってある',
      'てある',
      'してある',
      'きてある'
    ]
  },
  {
    name: 'simplified te ageru',
    forms: [
      'ったげる',
      'いたげる',
      'いだげる',
      'したげる',
      'ったげる',
      'んだげる',
      'んだげる',
      'んだげる',
      'ったげる',
      'たげる',
      '?',
      '?'
    ]
  },
  {
    name: 'te oru',
    forms: [
      'っておる',
      'いておる',
      'いでおる',
      'しておる',
      'っておる',
      'んでおる',
      'んでおる',
      'んでおる',
      'っておる',
      'ておる',
      '?',
      '?'
    ]
  },
  {
    name: 'simplified te oru',
    forms: [
      'っとる',
      'いとる',
      'いどる',
      'しとる',
      'っとる',
      'んどる',
      'んどる',
      'んどる',
      'っとる',
      'とる',
      '?',
      '?'
    ]
  },
  {
    name: 'te oku',
    forms: [
      'っておく',
      'いておく',
      'いでおく',
      'しておく',
      'っておく',
      'んでおく',
      'んでおく',
      'んでおく',
      'っておく',
      'ておく',
      '?',
      '?'
    ]
  },
  {
    name: 'simplified te oku',
    forms: [
      'っとく',
      'いとく',
      'いどく',
      'しとく',
      'っとく',
      'んどく',
      'んどく',
      'んどく',
      'っとく',
      'とく',
      '?',
      '?'
    ]
  },

  // Tai/tageru: 23-24
  {
    name: 'desire',
    forms: [
      'いたい',
      'きたい',
      'ぎたい',
      'したい',
      'ちたい',
      'みたい',
      'びたい',
      'にたい',
      'りたい',
      'たい',
      'したい',
      'きたい'
    ]
  },
  {
    name: "other's desire",
    forms: [
      'いたがる',
      'きたがる',
      'ぎたがる',
      'したがる',
      'ちたがる',
      'みたがる',
      'びたがる',
      'にたがる',
      'りたがる',
      'たがる',
      '?',
      '?'
    ]
  },

  // Pseudo-futurum forms: 25-30
  {
    name: 'pseudo futurum',
    forms: [
      'おう',
      'こう',
      'ごう',
      'そう',
      'とう',
      'もう',
      'ぼう',
      'のう',
      'ろう',
      'よう',
      'しよう',
      'こよう'
    ]
  },
  {
    name: 'polite presumptive',
    forms: [
      'うでしょう',
      'くでしょう',
      'ぐでしょう',
      'すでしょう',
      'つでしょう',
      'むでしょう',
      'ぶでしょう',
      'ぬでしょう',
      'るでしょう',
      'るでしょう',
      '?',
      '?'
    ]
  },
  {
    name: 'plain presumptive',
    forms: [
      'うだろう',
      'くだろう',
      'ぐだろう',
      'すだろう',
      'つだろう',
      'むだろう',
      'ぶだろう',
      'ぬだろう',
      'るだろう',
      'るだろう',
      '?',
      '?'
    ]
  },
  {
    name: 'polite negative presumptive',
    forms: [
      'わないだろう',
      'かないだろう',
      'がないだろう',
      'さないだろう',
      'たないだろう',
      'まないだろう',
      'ばないだろう',
      'なないだろう',
      'らないだろう',
      'ないだろう',
      '?',
      '?'
    ]
  },
  {
    name: 'plain negative presumptive',
    forms: [
      'うまい',
      'くまい',
      'ぐまい',
      'すまい',
      'つまい',
      'むまい',
      'ぶまい',
      'ぬまい',
      'るまい',
      'まい',
      '?',
      '?'
    ]
  },
  {
    name: 'past presumptive',
    forms: [
      'ったろう',
      'いたろう',
      'いだろう',
      'したろう',
      'ったろう',
      'んだろう',
      'んだろう',
      'んだろう',
      'った',
      'たろう',
      '?',
      '?'
    ]
  },

  // Izenkei / kateikei: 31-32
  {
    name: 'hypothetical',
    forms: [
      'えば',
      'けば',
      'げば',
      'せば',
      'てば',
      'めば',
      'べば',
      'ねば',
      'れば',
      'れば',
      'すれば',
      'くれば'
    ]
  },
  {
    name: 'past hypothetical',
    forms: [
      'ったら',
      'いたら',
      'いだら',
      'したら',
      'ったら',
      'んだら',
      'んだら',
      'んだら',
      'ったら',
      'たら',
      'したら',
      'きたら'
    ]
  },
  {
    name: 'short potential',
    forms: [
      'える',
      'ける',
      'げる',
      'せる',
      'てる',
      'める',
      'べる',
      'ねる',
      'れる',
      '',
      'できる',
      'こられる'
    ]
  },

  // Saserareru: 33-35
  {
    name: 'passive',
    forms: [
      'われる',
      'かれる',
      'がれる',
      'される',
      'たれる',
      'まれる',
      'ばれる',
      'なれる',
      'られる',
      'られる',
      'される',
      'こられる'
    ]
  },
  {
    name: 'causative',
    forms: [
      'わせる',
      'かせる',
      'がせる',
      'させる',
      'たせる',
      'ませる',
      'ばせる',
      'なせる',
      'らせる',
      'させる',
      'させる',
      'こさせる'
    ]
  },
  {
    name: 'causative passive',
    forms: [
      'わせられる',
      'かせられる',
      'がせられる',
      'させられる',
      'たせられる',
      'ませられる',
      'ばせられる',
      'なせられる',
      'らせられる',
      'させられる',
      'させられる',
      'こさせられる'
    ]
  },

  // Commands: 36-41
  {
    name: 'requesting',
    forms: [
      'ってください',
      'いてください',
      'いでください',
      'してください',
      'ってください',
      'んでください',
      'んでください',
      'んでください',
      'ってください',
      'てください',
      'してください',
      'きてください'
    ]
  },

  {
    name: 'commanding',
    forms: ['え', 'け', 'げ', 'せ', 'て', 'め', 'べ', 'ね', 'れ', 'ろ', 'しろ', 'こい']
  },
  {
    name: 'authoritative',
    forms: [
      'いなさい',
      'きなさい',
      'ぎなさい',
      'しなさい',
      'ちなさい',
      'みなさい',
      'びなさい',
      'になさい',
      'りなさい',
      'なさい',
      'しなさい',
      'きなさい'
    ]
  },
  { name: 'advisory', forms: ['', '', '', '', '', '', '', '', '', 'よ', '?', '?'] },
  {
    name: 'negative request',
    forms: [
      'わないでください',
      'かないでください',
      'がないでください',
      'さないでください',
      'たないでください',
      'まないでください',
      'ばないでください',
      'なないでください',
      'らないでください',
      'ないでください',
      'しないでください',
      'こないでください'
    ]
  },
  {
    name: 'negative imperative',
    forms: [
      'うな',
      'くな',
      'ぐな',
      'すな',
      'つな',
      'むな',
      'ぶな',
      'ぬな',
      'るな',
      'るな',
      'するな',
      'くるな'
    ]
  },

  // Belief about [...]ness: 42-44
  {
    name: 'looks to be the case',
    forms: [
      'いそう',
      'きそう',
      'ぎそう',
      'しそう',
      'ちそう',
      'みそう',
      'びそう',
      'にそう',
      'りそう',
      'そう',
      '?',
      '?'
    ]
  },
  {
    name: 'claimed to be the case',
    forms: [
      'うそう',
      'くそう',
      'ぐそう',
      'すそう',
      'つそう',
      'むそう',
      'ぶそう',
      'ぬそう',
      'るそう',
      'るそう',
      '?',
      '?'
    ]
  },
  {
    name: 'apparently the case',
    forms: [
      'うらしい',
      'くらしい',
      'ぐらしい',
      'すらしい',
      'つらしい',
      'むらしい',
      'ぶらしい',
      'ぬらしい',
      'るらしい',
      'るらしい',
      '?',
      '?'
    ]
  }
]

conjugationForms.sort((a, b) => {
  return b.forms[0].length - a.forms[0].length
})

const verbTypes = [
  'V5U',
  'V5K',
  'V5G',
  'V5S',
  'V5T',
  'V5M',
  'V5B',
  'V5N',
  'V5R',
  'V1',
  'IRS',
  'IRK'
]
const verbEndings = [
  'う',
  'く',
  'ぐ',
  'す',
  'つ',
  'む',
  'ぶ',
  'ぬ',
  'る',
  'る',
  'る',
  'る'
]

module.exports = {
  conjugate: function (verb, type) {
    if (!verb || !type) throw new Error('Missing param')
    const ret = []
    let index, verbstem

    if (type.toLowerCase().indexOf('V1') > -1) {
      index = verbTypes.indexOf('V1')
      verbstem = verb.substring(0, verb.length - 1)
    } else if (type.toLowerCase().indexOf('IRS') > -1) {
      index = verbTypes.indexOf('IRS')
      verbstem = verb.substring(0, verb.length - 2)
    } else if (type.toLowerCase().indexOf('IRK') > -1) {
      index = verbTypes.indexOf('IRK')
      verbstem = verb.substring(0, verb.length - 2)
    } else {
      const lastchar = verb.substring(verb.length - 1, verb.length)

      index = verbEndings.indexOf(lastchar)
      verbstem = verb.substring(0, verb.length - 1)
    }

    const e = conjugationForms.length

    let i, form, specific

    for (i = 0; i < e; i++) {
      form = conjugationForms[i]
      specific = form.forms[index]
      if (specific !== false) {
        ret.push({ name: form.name, form: verbstem + specific })
      }
    }

    return ret
  }
}
