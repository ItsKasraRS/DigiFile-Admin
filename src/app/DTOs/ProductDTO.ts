export class ProductListDTO {
    constructor(
        public products: [],
        public pageCount: number,
        public currentPage: number
    ) {}
}

export class setProductFilters {
    constructor(
        public title: string,
        public pageId: number
    ) {}
}

export class AddProductDTO {
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public category: number,
        public subCategory: number,
        public selectedImage: string,
        public selectedSourceFile
    ) {}
}

export class EditProductDTO {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public image: string,
        public sourceFile: string,
        public price: number,
        public category: number,
        public subCategory: number,
        public selectedImage: string,
        public selectedSourceFile,
        public releaseDate: Date
    ) {}
}