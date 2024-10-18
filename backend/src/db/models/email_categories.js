const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const email_categories = sequelize.define(
    'email_categories',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  email_categories.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.email_categories.belongsTo(db.emails, {
      as: 'email',
      foreignKey: {
        name: 'emailId',
      },
      constraints: false,
    });

    db.email_categories.belongsTo(db.categories, {
      as: 'category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    db.email_categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.email_categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return email_categories;
};
