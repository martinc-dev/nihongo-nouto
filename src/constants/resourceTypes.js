const resourceTypes = {
  VERB: {
    id: 1,
    key: 'VERB',
    sname: 'Verb',
    pname: 'Verbs',
    path: 'verb',
    contentType: 'verbs',
    pathName: 'verbs',
    isMain: true
  },
  ADJ: {
    id: 2,
    key: 'ADJ',
    sname: 'Adjective',
    pname: 'Adjectives',
    path: 'adj',
    contentType: 'adjectives',
    pathName: 'adjectives',
    isMain: true
  },
  OTHER: {
    id: 3,
    key: 'OTHER',
    sname: 'Other',
    pname: 'Others',
    path: 'other',
    contentType: 'others',
    pathName: 'others',
    isMain: true
  },
  NOUN: {
    id: 4,
    key: 'NOUN',
    sname: 'Noun',
    pname: 'Nouns',
    path: 'noun',
    contentType: 'nouns',
    pathName: 'nouns',
    isMain: true
  },
  NOUN_TAG_REL: {
    id: 5,
    key: 'NOUN_TAG_REL',
    sname: '',
    pname: '',
    path: 'noun_tag_rel',
    isMain: false
  },
  NOUN_TAG: {
    id: 6,
    key: 'NOUN_TAG',
    sname: '',
    pname: '',
    path: 'noun_tag',
    isMain: false
  }
}

export default resourceTypes
