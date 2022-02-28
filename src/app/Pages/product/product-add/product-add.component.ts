import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddProductData } from 'src/app/DTOs/ProductDTO';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup = null;
  public Editor = ClassicEditor;
  categories = null;
  subCategories = null;
  selectedCategory = null;
  selectedSubCategory = null;
  constructor(private api: ProductService, private toastr: ToastrService, private router: Router) {
    this.productForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      productImage: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res => {
      this.categories = res.data;
      this.selectedCategory = this.categories[0].categoryId;
      this.api.getSubCategories(this.categories[0].categoryId).subscribe(res => {
        this.subCategories = res.data;
        this.selectedSubCategory = this.subCategories[0].categoryId;
      })
    })
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.patchValue({
          productImage: reader.result
        });
      };
    }
  }
  getSubCategories(event) {
    this.api.getSubCategories(event.target.value).subscribe(res => {
      this.selectedCategory = event.target.value;
      this.subCategories = res.data;
      this.selectedSubCategory = this.subCategories[0].categoryId;
    })
  }

  getSubCategory(event) { this.selectedSubCategory = event.target.value; }

  // Add PRODUCT //
  addProduct() {
    if (this.productForm.valid) {
      const product = new AddProductData(this.productForm.controls.title.value, this.productForm.controls.description.value, this.productForm.controls.productImage.value, this.productForm.controls.price.value, this.selectedCategory, this.selectedSubCategory);
      this.api.addProduct(product).subscribe(res => {
        if (res.status === "Success") {
          this.toastr.success('product successfully added', '');
          this.router.navigate(['/product/list']);
        }
        if (res.status === "Error") {
          this.toastr.error(res.description, 'Error');
        }
      })
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }
}
