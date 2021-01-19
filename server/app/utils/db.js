/* eslint-disable new-cap, no-console */
const Sequelize = require('sequelize')
const env = require('../../env')

class DBManage {
  constructor() {
    this.connection = new Sequelize(env.database.name, env.database.username, env.database.password, { host: env.database.host, port: env.database.port, dialect: 'mysql' })

    // Test database connection
    this.connection
      .authenticate()
      .then(() => console.log('Database Connected'))
      .catch(err => console.error('Cannot connect to the database:', err))

    this.NounTag = this.connection.define(
      'noun_tag',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      },
      {
        timestamps: false,
        underscored: true
      }
    )

    this.Noun = this.connection.define(
      'noun',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        romaji: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        sense: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        }
      },
      {
        timestamps: true,
        underscored: true
      }
    )

    this.NounTagRel = this.connection.define(
      'noun_tag_rel',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nounId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: this.Noun,
            key: 'id'
          }
        },
        tagId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: this.NounTag,
            key: 'id'
          }
        }
      },
      {
        timestamps: false,
        underscored: true
      }
    )

    this.Adv = this.connection.define(
      'adv',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        romaji: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        sense: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        }
      },
      {
        timestamps: true,
        underscored: true
      }
    )

    this.Adj = this.connection.define(
      'adj',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        romaji: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        sense: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        isIConjugation: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        timestamps: true,
        underscored: true
      }
    )

    this.Verb = this.connection.define(
      'noun',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        romaji: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        group: {
          type: Sequelize.ENUM(['ICHIDAN', 'GODAN', 'IRREGULAR']),
          allowNull: true,
          defaultValue: null
        },
        sense: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        stem: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        teForm: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        aDan: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        eDan: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        oDan: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        isTransitive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        isIntransitive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        timestamps: true,
        underscored: true
      }
    )
  }

  applyResult(result, callback) {
    try {
      callback(JSON.parse(JSON.stringify(result)))
    } catch (error) {
      callback(null)
      console.error(error)
    }
  }

  getModel(key) {
    return {
      nounTag: this.NounTag,
      noun: this.Noun,
      nounTagRel: this.NounTagRel,
      adv: this.Adv,
      adj: this.Adj,
      verb: this.Verb
    }[key]
  }

  query({ tablename, conditionKV = null, orderBy = 'id', isAsc = false, limit = 0, page = 0 }) {
    const model = this.getModel(tablename)
    const pagination =
      limit >= 1 && page >= 1
        ? {
            limit,
            offset: (page - 1) * limit
          }
        : {}

    return new Promise(resolve => {
      if (!conditionKV) model.findAndCountAll().then(result => this.applyResult(result, resolve))
      else model.findAndCountAll({ where: conditionKV, order: [[orderBy, isAsc ? 'ASC' : 'DESC']], ...pagination }).then(result => this.applyResult(result, resolve))
    })
  }

  create({ tablename, fieldKV }) {
    const model = this.getModel(tablename)

    return new Promise(resolve => model.create(fieldKV).then(result => this.applyResult(result, resolve)))
  }

  update({ tablename, fieldKV, conditionKV }) {
    const model = this.getModel(tablename)

    return new Promise(resolve => model.update(fieldKV, { where: conditionKV }).then(result => this.applyResult(result, resolve)))
  }

  remove({ tablename, conditionKV }) {
    const model = this.getModel(tablename)

    return new Promise(resolve => model.destroy({ where: conditionKV }).then(result => this.applyResult(result, resolve)))
  }
}

module.exports = new DBManage()
