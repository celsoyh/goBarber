module.exports = {
  dialect: 'postgres',
  username: 'docker',
  password: 'docker',
  database: 'gobarber',
  host: '127.0.0.1',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
