export interface IBaseController {
  create: (...params: any) => Promise<Object>;
  updateOne: (...params: any) => Promise<Object>;
  deleteOne: (...params: any) => Promise<Object>;
  getAll: (...params: any) => Promise<Object[]>;
  getOne: (...params: any) => Promise<Object>;
}
