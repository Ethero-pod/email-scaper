const db = require('../models');
const Users = db.users;

const Categories = db.categories;

const EmailCategories = db.email_categories;

const Emails = db.emails;

const CategoriesData = [
  {
    name: 'Venue',

    description: 'Emails related to venue bookings and inquiries.',
  },

  {
    name: 'Catering',

    description: 'Emails related to catering services and proposals.',
  },

  {
    name: 'Photography',

    description: 'Emails related to photography services and packages.',
  },
];

const EmailCategoriesData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const EmailsData = [
  {
    subject: 'Wedding Venue Confirmation',

    body: 'We are pleased to confirm your wedding venue booking.',

    received_at: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    subject: 'Catering Service Proposal',

    body: 'Please find attached our catering service proposal.',

    received_at: new Date('2023-10-02T11:30:00Z'),

    // type code here for "relation_one" field
  },

  {
    subject: 'Photography Package Details',

    body: 'Here are the details of our photography packages.',

    received_at: new Date('2023-10-03T09:15:00Z'),

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateEmailCategoryWithEmail() {
  const relatedEmail0 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const EmailCategory0 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EmailCategory0?.setEmail) {
    await EmailCategory0.setEmail(relatedEmail0);
  }

  const relatedEmail1 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const EmailCategory1 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EmailCategory1?.setEmail) {
    await EmailCategory1.setEmail(relatedEmail1);
  }

  const relatedEmail2 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const EmailCategory2 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EmailCategory2?.setEmail) {
    await EmailCategory2.setEmail(relatedEmail2);
  }
}

async function associateEmailCategoryWithCategory() {
  const relatedCategory0 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const EmailCategory0 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EmailCategory0?.setCategory) {
    await EmailCategory0.setCategory(relatedCategory0);
  }

  const relatedCategory1 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const EmailCategory1 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EmailCategory1?.setCategory) {
    await EmailCategory1.setCategory(relatedCategory1);
  }

  const relatedCategory2 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const EmailCategory2 = await EmailCategories.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EmailCategory2?.setCategory) {
    await EmailCategory2.setCategory(relatedCategory2);
  }
}

async function associateEmailWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setUser) {
    await Email0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setUser) {
    await Email1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setUser) {
    await Email2.setUser(relatedUser2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Categories.bulkCreate(CategoriesData);

    await EmailCategories.bulkCreate(EmailCategoriesData);

    await Emails.bulkCreate(EmailsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateEmailCategoryWithEmail(),

      await associateEmailCategoryWithCategory(),

      await associateEmailWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});

    await queryInterface.bulkDelete('email_categories', null, {});

    await queryInterface.bulkDelete('emails', null, {});
  },
};
