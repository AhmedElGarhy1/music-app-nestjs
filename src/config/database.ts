import { TypeOrmModule } from '@nestjs/typeorm';

const database: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gemater',
  database: 'music_app',
  entities: [__dirname + '/**/*.entity{.js/.ts}'],
};

export default database;
