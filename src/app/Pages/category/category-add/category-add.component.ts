import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { AddCategoryDTO } from './../../../DTOs/CategoryDTO';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { format } from 'path';
import { EventEmitter } from 'stream';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup = null;
  parentId = null;
  constructor(private api: CategoryService, private dialogRef: MatDialogRef<CategoryAddComponent>, private toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.parentId = data.parentId;
    this.categoryForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    })
  }

  ngOnInit(): void {
  }
  addCategory() {
    if (this.categoryForm.valid) {
      const category = new AddCategoryDTO(this.parentId, this.categoryForm.controls.title.value);
      this.api.addCategory(category).subscribe(res => {
        this.toastr.success('user successfully added', '');
        this.router.navigate(['/category/list']);
        this.dialogRef.close({data: res.data});
        this.categoryForm.reset();
      })
    }
    else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
