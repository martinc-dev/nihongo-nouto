export interface ResourceType {
  id: number
  key: string
  sname: string
  pname: string
  path: string
  contentType?: string
  pathName?: string
  isMain: boolean
}

export interface ResourceTypes {
  VERB: ResourceType
  ADJ: ResourceType
  NOUN: ResourceType
  OTHER: ResourceType
  NOUN_TAG_REL: ResourceType
  NOUN_TAG: ResourceType
}

export type ResourceTypeKey = keyof ResourceTypes
