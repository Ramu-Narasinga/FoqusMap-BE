export interface CRUD {
    // list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: number, resource: any) => Promise<any>;
    readById: (id: number) => Promise<any>;
    deleteById: (id: number) => Promise<any>;
    patchById: (id: number, resource: any) => Promise<any>;
}