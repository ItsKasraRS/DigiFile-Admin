import { ActivatedRoute, Router } from '@angular/router';
import { setProductFilters } from './../../../DTOs/ProductDTO';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/Product/product.service';
import { OriginalDomain } from 'src/app/Utilities/ApiPath';
import { ProductListDTO } from 'src/app/DTOs/ProductDTO';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductListDTO = new ProductListDTO([], 1, 1);
  product = null;
  imagePath = OriginalDomain + 'product/thumbnail/';
  loaded = false;
  prodTitle = '';
  list = null;
  pages = [];
  filters: setProductFilters = new setProductFilters('', 1);
  constructor(private api: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.filters.title = params.title ? params.title : '';
      this.prodTitle = params.title ? params.title : '';
      this.filters.pageId = pageId;
      this.getProduct();
    })
    this.getProduct();
  }
  getProduct() {
    this.api.getProducts(this.filters).subscribe(res => {
      if (res.status === "Success") {
        this.product = res.data.products;
        this.list = res.data.products;
        this.loaded = true;
        this.products = res.data;
        this.pages = [];
        for (let index = 1; index <= this.products.pageCount; index++) {
          this.pages.push(index);
        }
      }
    })
  }
  searchByTitle(event) {
    this.filters.title = event.target.value;
    this.prodTitle = event.target.value;
    this.router.navigate(['product/list'], { queryParams: { pageId: this.filters.pageId, title: this.prodTitle } });
    this.getProduct();
  }

  public getPicture(image) {
    return this.imagePath + image;
  }

  setPage(page: number) {
    this.filters.pageId = page;
    this.filters.title = this.prodTitle;
    // if (this.prodTitle !== null || this.prodTitle !==  '' || this.prodTitle !==  undefined) {
    //   this.router.navigate(['product/list'], {queryParams: {pageId: page, title: this.prodTitle}});
    // }
    // else {
    //   this.router.navigate(['product/list'], {queryParams: {pageId: page}});
    // }
    this.router.navigate(['product/list'], { queryParams: { pageId: page, title: this.prodTitle } });
    this.getProduct();
  }

  deleteProduct(id: number, item) {
    this.api.deleteProduct(id).subscribe(res => {
      if (res.status === 'Success') {
        const index = this.product.indexOf(item);
        if (index !== -1) {
          this.product.splice(index, 1);
        }
      }
    });
  }
}
