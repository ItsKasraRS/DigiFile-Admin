import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { AddRoleDTO } from 'src/app/DTOs/RoleDTO';
import { rolesDTO } from 'src/app/DTOs/UserDTO';
import { RoleService } from 'src/app/Services/Role/role.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  roleForm: FormGroup = null;
  permissions = null;
  selectedPermissions = [];
  constructor(private api: RoleService, private toastr: ToastrService, private router: Router, private toast: HotToastService) { 
    this.roleForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(200)])
    })
  }

  ngOnInit(): void {
    this.api.getPermissions().subscribe(res=> {
      this.permissions = res.data;
      console.log(this.permissions);
    }, err=> console.log(err));
  }

  onPermissionChange(event) {
    if (event.checked) {
      this.selectedPermissions.push(parseInt(event.source.value))
    }
    else {
      let index = this.selectedPermissions.findIndex(x => x.value == event.source.value);
      this.selectedPermissions =  this.selectedPermissions.filter(item => item !== parseInt(event.source.value))
    }
  }

  addRole() {
    if(this.roleForm.valid) {
      const role = new AddRoleDTO(this.roleForm.controls.title.value, this.selectedPermissions);
      this.api.addRole(role).subscribe(res=> {
        if(res.status === "Success") {
          this.toast.success(res.message);
          this.router.navigate(['/role/list']);
        }
        if(res.status === "Error") {
          this.toast.error(res.message);
        }
      })
    }
  }
}
