/* eslint-disable new-cap, no-console */
import { DataTypes, Model, Sequelize } from 'sequelize'
import { getDBConnection } from '../utils/db'

const connection: Sequelize = getDBConnection()

export interface NounTagAttributes {
  id: number
  name: string
}

export interface NounAttributes {
  id: number
  word: string
  hiragana: string
  sense: string
  createdAt?: Date
  updatedAt?: Date
}

export interface NounTagRelAttributes {
  id: number
  nounId: number
  tagId: number
}

export interface OtherAttributes {
  id: number
  word: string
  hiragana: string
  sense: string
  createdAt?: Date
  updatedAt?: Date
}

export interface AdjAttributes {
  id: number
  word: string
  hiragana: string
  sense: string
  isIConjugation: boolean
  createdAt?: Date
  updatedAt?: Date
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

export interface VerbAttributes {
  id: number
  word: string
  hiragana: string
  group: VerbGroup | null
  sense: string
  stem: string
  teForm: string
  aDan: string
  eDan: string
  oDan: string
  isTransitive: boolean
  isIntransitive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const NounTag = connection.define<Model<NounTagAttributes>>(
  'noun_tag',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
)

export const Noun = connection.define<Model<NounAttributes>>(
  'noun',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    hiragana: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    sense: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
)

export const NounTagRel = connection.define<Model<NounTagRelAttributes>>(
  'noun_tag_rel',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nounId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Noun,
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: NounTag,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
)

export const Other = connection.define<Model<OtherAttributes>>(
  'other',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    hiragana: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    sense: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
)

export const Adj = connection.define<Model<AdjAttributes>>(
  'adj',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    hiragana: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    sense: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    isIConjugation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
)

export const Verb = connection.define<Model<VerbAttributes>>(
  'verb',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    hiragana: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    group: {
      type: DataTypes.ENUM(
        'V5U',
        'V5K',
        'V5KS',
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
      ),
      allowNull: true,
      defaultValue: null,
    },
    sense: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    stem: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    teForm: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    aDan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    eDan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    oDan: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    isTransitive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isIntransitive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
)

Noun.hasMany(NounTagRel, { as: 'nounTagRel', foreignKey: 'nounId' })
NounTagRel.belongsTo(NounTag, { as: 'nounTag', foreignKey: 'tagId' })

