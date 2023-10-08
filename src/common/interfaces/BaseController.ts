export interface IBaseController {
  create: (...params: any) => Promise<Object>;
  update: (...params: any) => Promise<Object>;
  remove: (...params: any) => Promise<Object>;
  getAll: (...params: any) => Promise<Object[]>;
  findOne: (...params: any) => Promise<Object>;
}
