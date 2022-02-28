import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/Product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductImagePath } from 'src/app/Utilities/ApiPath';
import { EditProductData } from 'src/app/DTOs/ProductDTO';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public Editor = ClassicEditor;
  imagePath = null;
  productForm: FormGroup = null;
  productData = new EditProductData(0, '', '', '', 0, 0, 0, null, null);
  categories = null;
  subCategories = null;
  selectedCategory = null;
  selectedSubCategory = null;
  loaded = false;
  constructor(private api: ProductService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      releaseDate: new FormControl(null),
      title: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      productImage: new FormControl(null),
      selectedImage: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.api.getProductForEdit(id).subscribe(res => {
        if (res.status === "Success") {
          this.productData = res.data;
          this.imagePath = ProductImagePath + res.data.image;
          console.log(this.productData);
          this.productForm.setValue({
            title: res.data.title,
            description: res.data.description,
            price: res.data.price,
            productImage: res.data.image,
            id: res.data.id,
            releaseDate: res.data.releaseDate,
            selectedImage: null
          });

          this.api.getCategories().subscribe(res => {
            this.categories = res.data;
            this.selectedCategory = this.categories.filter(c => c.categoryId === this.productData.category)[0].categoryId;

            this.api.getSubCategories(this.categories.filter(c => c.categoryId === this.productData.category)[0].categoryId).subscribe(res => {
              this.subCategories = res.data;
              this.selectedSubCategory = this.subCategories[0].categoryId;
            })

            this.loaded = true;
          })

        }
      })
    });
  }


  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.patchValue({
          selectedImage: reader.result
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

  editProduct() {
    if (this.productForm.valid) {
      const product = new EditProductData(this.productForm.controls.id.value, this.productForm.controls.title.value, this.productForm.controls.description.value, this.productForm.controls.productImage.value, this.productForm.controls.price.value, this.selectedCategory, this.selectedSubCategory, this.productForm.controls.selectedImage.value, this.productForm.controls.releaseDate.value)
      this.api.editProduct(product).subscribe(res => {
        if (res.status === "Success") {
          this.toastr.success('product has been updated successfully!', '');
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
