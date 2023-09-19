export interface IBaseCRUD {
  create: (data: any) => Promise<any>;
  findAll: () => Promise<any[]>;
  findById: (id: number) => Promise<any>;
  updateById: (id: number, data: any) => Promise<any>;
  deleteById: (id: number) => Promise<any>;
}
