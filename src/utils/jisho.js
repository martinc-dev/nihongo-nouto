import {
  verbPOSTypeMarkers,
  verbClassificationNaiveGuess,
  verbPOSTypeRegexMarkers,
  verbPOSTrMarkers,
  adjPOSTypeMarkers,
} from 'src/constants/jisho'

export const parseVerbProp = ({ partsOfSpeechArray, word }) => {
  const verbProp = {
    verbType: null,
    verbClassification: null,
    verbIsTransitive: false,
    verbIsInTransitive: false,
  }

  partsOfSpeechArray.map(t => {
    const pos = t.toLowerCase()

    if (verbPOSTypeMarkers[pos]) verbProp.verbClassification = verbPOSTypeMarkers[pos]
    Object.keys(verbPOSTypeRegexMarkers).map(k => {
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

export const parseAdjProp = ({ partsOfSpeechArray }) => {
  const adjProp = { adjType: null }

  partsOfSpeechArray.map(t => {
    const pos = t.toLowerCase()

    if (adjPOSTypeMarkers[pos]) adjProp.adjType = adjPOSTypeMarkers[pos]
  })

  return adjProp
}
