module.exports = {
  HOST: "localhost",
  USER: "monty",
  PASSWORD: "some_pass",
  DB: "db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
