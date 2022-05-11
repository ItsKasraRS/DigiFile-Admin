import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { CategoryAddComponent } from '../category-add/category-add.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  loaded = false;
  categories = null;
  subCategories = null;
  constructor(private api: CategoryService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res => {
      this.categories = res.data.categories;
      this.subCategories = res.data.subCategories;
      this.loaded = true;
    })
  }

  openDialog(parentId?) {
    if (parentId !== null) {
      const dialogRef = this.dialog.open(CategoryAddComponent, {
        data: { parentId: parentId }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.data) {
          if (result.data.parentId === null) {
            this.categories.push(result.data);
          }
          if (result.data.parentId !== null) {
            this.subCategories.push(result.data);
          }
        }
      });
    }
    else {
      const dialogRef = this.dialog.open(CategoryAddComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        this.categories.push(result.data);
      });
    }
  }

  deleteCategory(id, item) {
    this.api.deleteCategory(id).subscribe(res => {
      if (res.status === 'Success') {
        if (!item.parentId) {
          const index = this.categories.indexOf(item);
          if (index !== -1) {
            this.categories.splice(index, 1);
          }
        }
        else {
          const index = this.subCategories.indexOf(item);
          if (index !== -1) {
            this.subCategories.splice(index, 1);
          }
        }
        this.toastr.success('user has been removed successfully', '');
      }
    });
  }
}
