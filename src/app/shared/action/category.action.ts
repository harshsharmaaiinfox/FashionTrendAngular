import { Params } from "../interface/core.interface";

export class GetCategories {
    static readonly type = "[Category] Get";
    constructor(public payload?: Params) {}
}

export class GetSearchByCategory {
    static readonly type = "[CategoryBySearch] Get";
    constructor(public payload?: Params) {}
}

  
export class GetCategoryBySlug {
    static readonly type = "[Category] Get Category By Slug";
    constructor(public slug: string) {}
}
