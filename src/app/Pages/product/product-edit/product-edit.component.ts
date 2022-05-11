import { HotToastService } from '@ngneat/hot-toast';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/Product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductImagePath } from 'src/app/Utilities/ApiPath';
import { EditProductDTO } from 'src/app/DTOs/ProductDTO';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public Editor = ClassicEditor;
  imagePath = null;
  productForm: FormGroup = null;
  productData = new EditProductDTO(0, '', '', '', '', 0, 0, 0, '',null,null);
  categories = null;
  subCategories = null;
  selectedCategory = null;
  selectedSubCategory = null;
  loaded = false;
  progressStatus = false;
  counter: number;

  constructor(private api: ProductService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private toast: HotToastService) {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      releaseDate: new FormControl(null),
      title: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      image: new FormControl(null),
      sourceFile: new FormControl(null),
      selectedImage: new FormControl(null),
      selectedSourceFile: new FormControl(null)
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
            id: res.data.id,
            releaseDate: res.data.releaseDate,
            selectedImage: null,
            selectedSourceFile: null,
            image: res.data.image, 
            sourceFile: res.data.sourceFile, 
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

  onSourceChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = <File>event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.patchValue({
          selectedSourceFile: event.target.files[0]
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
      this.progressStatus = true;

      let formData = new FormData();
      formData.append('id', this.productForm.controls.id.value);
      formData.append('title', this.productForm.controls.title.value);
      formData.append('description', this.productForm.controls.description.value);
      formData.append('price', this.productForm.controls.price.value);
      formData.append('image', this.productForm.controls.image.value);
      formData.append('sourceFile', this.productForm.controls.sourceFile.value);
      formData.append('category', this.selectedCategory);
      formData.append('subCategory', this.selectedSubCategory);
      formData.append('releaseDate', this.productForm.controls.releaseDate.value);
      formData.append('selectedImage', this.productForm.controls.selectedImage.value);
      formData.append('selectedSourceFile', this.productForm.controls.selectedSourceFile.value);
      console.log(formData);
      this.api.editProduct(formData).subscribe(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.counter = Math.round(100 * event.loaded / event.total)
        }
        else if (event.type === HttpEventType.Response) {
          if (event.body.status === "Error") {
            this.toast.error(event.body.message);
            this.progressStatus = false;
          }
          if (event.body.status === "Success") {
            this.toastr.success('product has been updated successfully!', '');
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
