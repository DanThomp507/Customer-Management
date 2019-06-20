const Sequelize = require('sequelize');
let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    logging:  true,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
  database: 'customer-management',
  dialect: 'postgresql',
  operatorAliases: false,
  define: {
    underscored: true,
  },
});
}
const User = sequelize.define( 'user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true, // checks if email is already being used
    allowNull: false,
    validate: {
      isEmail: { // checks if input is in email form
        msg: 'please enter a valid email address'
      },
      notNull: { // message given if null
        msg: 'please enter an email address'
      }
    }
  },
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  description: Sequelize.STRING,
});

module.exports = {
  User,
  sequelize
}
