const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Email_categoriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_categories = await db.email_categories.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_categories.setEmail(data.email || null, {
      transaction,
    });

    await email_categories.setCategory(data.category || null, {
      transaction,
    });

    return email_categories;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const email_categoriesData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const email_categories = await db.email_categories.bulkCreate(
      email_categoriesData,
      { transaction },
    );

    // For each item created, replace relation files

    return email_categories;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_categories = await db.email_categories.findByPk(
      id,
      {},
      { transaction },
    );

    await email_categories.update(
      {
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await email_categories.setEmail(data.email || null, {
      transaction,
    });

    await email_categories.setCategory(data.category || null, {
      transaction,
    });

    return email_categories;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_categories = await db.email_categories.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of email_categories) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of email_categories) {
        await record.destroy({ transaction });
      }
    });

    return email_categories;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const email_categories = await db.email_categories.findByPk(id, options);

    await email_categories.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await email_categories.destroy({
      transaction,
    });

    return email_categories;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const email_categories = await db.email_categories.findOne(
      { where },
      { transaction },
    );

    if (!email_categories) {
      return email_categories;
    }

    const output = email_categories.get({ plain: true });

    output.email = await email_categories.getEmail({
      transaction,
    });

    output.category = await email_categories.getCategory({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.emails,
        as: 'email',
      },

      {
        model: db.categories,
        as: 'category',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.email) {
        const listItems = filter.email.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          emailId: { [Op.or]: listItems },
        };
      }

      if (filter.category) {
        const listItems = filter.category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          categoryId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.email_categories.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.email_categories.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('email_categories', 'email', query),
        ],
      };
    }

    const records = await db.email_categories.findAll({
      attributes: ['id', 'email'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['email', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.email,
    }));
  }
};
