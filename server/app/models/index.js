/* eslint-disable new-cap, no-console */
const { DataTypes } = require('sequelize')
const { getDBConnection } = require('../utils/db')

const connection = getDBConnection()

const NounTag = connection.define(
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

const Noun = connection.define(
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
const NounTagRel = connection.define(
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
const Other = connection.define(
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
const Adj = connection.define(
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
const Verb = connection.define(
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
      type: DataTypes.ENUM([
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
        'IRK',
      ]),
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
NounTagRel.hasMany(NounTag, { as: 'nounTag', foreignKey: 'id' })

module.exports = {
  NounTag,
  Noun,
  NounTagRel,
  Other,
  Adj,
  Verb,
}
