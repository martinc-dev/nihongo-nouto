import { ConjugationResult } from 'src/utils/conjugation'

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface BaseWord {
  id: number
  word: string
  sense: string
  createdAt?: string
  updatedAt?: string
}

export type VerbGroup =
  | 'V5U'
  | 'V5K'
  | 'V5KS'
  | 'V5G'
  | 'V5S'
  | 'V5T'
  | 'V5M'
  | 'V5B'
  | 'V5N'
  | 'V5R'
  | 'V1'
  | 'IRS'
  | 'IRK'

export interface VerbWord extends BaseWord {
  hiragana: string
  group: VerbGroup | null
  stem: string
  teForm: string
  aDan: string
  eDan: string
  oDan: string
  isTransitive: boolean
  isIntransitive: boolean
  conjugation?: ConjugationResult
}

export type AdjType = 'IADJ' | 'NAADJ'

export interface AdjWord extends BaseWord {
  hiragana: string
  isIConjugation: boolean
}

export interface NounWord extends BaseWord {
  hiragana: string
}

export interface OtherWord extends BaseWord {
  hiragana: string
}

export type Word = VerbWord | AdjWord | NounWord | OtherWord

export interface NounTagRelItem {
  id?: number
  nounId?: number
  tagId: number
  nounTag?: {
    id: number
    name: string
  }
}

// Word list item (simplified version for list display)
export interface WordListItem {
  id: number
  word: string
  hiragana?: string
  romaji?: string
  group?: VerbGroup | null
  isIConjugation?: boolean
  sense?: string
  isTransitive?: boolean
  isIntransitive?: boolean
  nounTagRel?: NounTagRelItem[] // For nouns
  [key: string]:
    | string
    | number
    | boolean
    | VerbGroup
    | null
    | undefined
    | React.ReactNode
    | NounTagRelItem[]
    | undefined
}

// Word detail (full word object)
export type WordDetail = VerbWord | AdjWord | NounWord | OtherWord | null

export interface ApiError {
  message?: string
  error?: string
  status?: number
  [key: string]: unknown
}

export interface ApiResponse<T = unknown> {
  error?: ApiError
  status?: number | null
  [key: string]: T | ApiError | number | null | undefined
}

export interface JishoWordOption {
  word?: string
  reading?: string
}

export interface JishoSense {
  englishDefinitions: string[]
  partsOfSpeech: string[]
}

export interface JishoDataItem {
  slug?: string
  japanese?: JishoWordOption[]
  senses?: JishoSense[]
}

export interface JishoMeta {
  status?: number
}

export interface JishoRawResponse {
  meta?: JishoMeta
  data?: JishoDataItem[]
}

export interface JishoSlugOption {
  slug: string
  japanese: JishoWordOption[]
  senses: Array<{
    definitions: string[]
    partsOfSpeech: string[]
    verbType?: string | null
    verbClassification?: string | null
    verbIsTransitive?: boolean
    verbIsInTransitive?: boolean
    adjType?: string | null
  }>
}

export interface JishoWordSearchResult {
  wordOptions: JishoWordOption[]
  definitionOptions: Array<{
    definitions: string[]
    verbType?: string | null
    verbClassification?: string | null
    verbIsTransitive?: boolean
    verbIsInTransitive?: boolean
    adjType?: string | null
  }>
  slugOptions?: JishoSlugOption[]
}

export type WordDupeResult = PaginatedResponse<WordListItem>

export interface SearchData {
  wordOptions?: JishoWordOption[]
  definitionOptions?: Array<{
    definitions: string[]
    verbType?: string | null
    verbClassification?: string | null
    verbIsTransitive?: boolean
    verbIsInTransitive?: boolean
    adjType?: string | null
  }>
}
