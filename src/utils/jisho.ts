import {
  verbPOSTypeMarkers,
  verbClassificationNaiveGuess,
  verbPOSTypeRegexMarkers,
  verbPOSTrMarkers,
  adjPOSTypeMarkers,
} from 'src/constants/jisho'

export interface VerbProp {
  verbType: string | null
  verbClassification: string | null
  verbIsTransitive: boolean
  verbIsInTransitive: boolean
}

export interface AdjProp {
  adjType: string | null
}

interface ParseVerbPropParams {
  partsOfSpeechArray: string[]
  word: string
}

interface ParseAdjPropParams {
  partsOfSpeechArray: string[]
}

export const parseVerbProp = ({ partsOfSpeechArray, word }: ParseVerbPropParams): VerbProp => {
  const verbProp: VerbProp = {
    verbType: null,
    verbClassification: null,
    verbIsTransitive: false,
    verbIsInTransitive: false,
  }

  partsOfSpeechArray.forEach(t => {
    const pos = t.toLowerCase()

    if (verbPOSTypeMarkers[pos]) verbProp.verbClassification = verbPOSTypeMarkers[pos]
    Object.keys(verbPOSTypeRegexMarkers).forEach(k => {
      if (verbPOSTypeRegexMarkers[k].test(pos)) verbProp.verbType = k
    })
    if (verbPOSTrMarkers[pos]) {
      if (verbPOSTrMarkers[pos] === 'transitive') verbProp.verbIsTransitive = true
      if (verbPOSTrMarkers[pos] === 'intransitive') verbProp.verbIsInTransitive = true
    }
  })

  if (verbProp.verbType && !verbProp.verbClassification) {
    if (verbProp.verbType === 'V5')
      verbProp.verbClassification = verbClassificationNaiveGuess[word.slice(-1)] || null
    else verbProp.verbClassification = verbProp.verbType
  }

  return verbProp
}

export const parseAdjProp = ({ partsOfSpeechArray }: ParseAdjPropParams): AdjProp => {
  const adjProp: AdjProp = { adjType: null }

  partsOfSpeechArray.forEach(t => {
    const pos = t.toLowerCase()

    if (adjPOSTypeMarkers[pos]) adjProp.adjType = adjPOSTypeMarkers[pos]
  })

  return adjProp
}

