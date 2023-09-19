import { Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {}
// export async function paginateAllRaw(
//   repo: any,
//   page: number = 1,
//   perPage: number = 50,
//   selectedArray: string[] = ['*'],
//   conditions: [string, string][] = [],
// ) {
//   const builder = repo
//     .createQueryBuilder(repo.metadata.tableName)
//     .select('*')
//     .skip((page - 1) * perPage)
//     .limit(perPage);

//   // // where
//   // if (conditions.length > 0) builder.where(conditions.shift());
//   // conditions.forEach((condition) => builder.andWhere(condition));

//   // joins
//   // not now

//   const data = await repo.find();
//   console.log(data);
//   return data;
// }
