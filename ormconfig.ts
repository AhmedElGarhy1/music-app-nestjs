module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gemater',
  // password: 'elgarhy',
  // password: 'root',
  database: 'music_app',
  entities: ['**/*.entity.js'],
  synchronize: true,
};
