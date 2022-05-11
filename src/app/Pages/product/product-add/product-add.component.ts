import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddProductDTO } from 'src/app/DTOs/ProductDTO';
import { HttpEventType, HttpRequest, JsonpClientBackend } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';


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
  sourceFile: File;
  progressStatus = false;
  counter: number;
  catLoaded = false;

  constructor(private api: ProductService, private toastr: ToastrService, private router: Router, private toast: HotToastService) {
    this.productForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      productImage: new FormControl(null),
      selectedImage: new FormControl(null),
      productFile: new FormControl(null),
      selectedFile: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res => {
      this.categories = res.data;
      this.selectedCategory = this.categories[0].categoryId;
      this.api.getSubCategories(this.categories[0].categoryId).subscribe(res => {
        this.subCategories = res.data;
        this.selectedSubCategory = this.subCategories[0].categoryId;
        this.catLoaded = true;
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
          selectedImage: reader.result
        });
      };
    }
  }

  onSourceChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = <File>event.target.files[0];
      this.sourceFile = event.target.files[0];      
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.patchValue({
          selectedFile: reader.result
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
      this.progressStatus = true;
      const source = this.productForm.controls.productFile;
      
      let formData = new FormData();
      formData.append('title', this.productForm.controls.title.value);
      formData.append('description', this.productForm.controls.description.value);
      formData.append('price', this.productForm.controls.price.value);
      formData.append('category', this.selectedCategory);
      formData.append('subCategory', this.selectedSubCategory);
      formData.append('selectedImage', this.productForm.controls.selectedImage.value);
      formData.append('selectedSourceFile', this.sourceFile);

      this.api.addProduct(formData).subscribe(event => {
        
        if (event.type === HttpEventType.DownloadProgress) {
          this.counter = Math.round(100 * event.loaded / event.total)
        }
        else if (event.type === HttpEventType.Response) {
          if (event.body.status === "Error") {
            this.toast.error(event.body.message);
            this.progressStatus = false;
          }
          if (event.body.status === "Success") {
            this.toastr.success('product successfully added', '');
            setTimeout(() => {
              this.router.navigate(['/product/list'])
            }, 1000);
          }
        }
      })
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }
}
