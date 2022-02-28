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

export class AddProductData {
    constructor(
        public title: string,
        public description: string,
        public selectedImage: string,
        public price: number,
        public category: number,
        public subCategory: number,
    ) {}
}

export class EditProductData {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public image: string,
        public price: number,
        public category: number,
        public subCategory: number,
        public selectedImage: string,
        public releaseDate: Date
    ) {}
}