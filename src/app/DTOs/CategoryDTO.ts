export class CategoryDTO {
    constructor(
        public categoryId: number,
        public parentId: number,
        public title: string,
    ){}
}

export class AddCategoryDTO {
    constructor(
        public parentId: number,
        public title: string
    ){}
}

export class AddSubCategoryDTO {
    constructor(
        public parentId: number,
        public title: number
    ){}
}