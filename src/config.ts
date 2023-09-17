import { TypeOrmModule } from '@nestjs/typeorm';

export const database: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gemater',
  // password: 'elgarhy',
  // password: 'root',
  database: 'music_app',
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  synchronize: true,
};
