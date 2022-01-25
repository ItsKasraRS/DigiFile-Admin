import { UserService } from 'src/app/Services/User/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddScript } from 'src/app/Utilities/AddScript';
import { addUserDTO, rolesDTO } from 'src/app/DTOs/UserDTO';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit, AfterViewInit {
  userForm: FormGroup = null;
  roles: rolesDTO[];
  selectedRoles = [];
  constructor(private api: UserService, private toastr: ToastrService, private router: Router) {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(8)]),
      isActive: new FormControl(null),
      imageAvatar: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.api.getRoles().subscribe(res => {
      if (res.status === "Success") {
        this.roles = res.data;
      }
    })
  }
  ngAfterViewInit(): void {
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userForm.patchValue({
          imageAvatar: reader.result
        });
      };
    }
  }

  onRoleChange(event) {
    if (event.checked) {
      this.selectedRoles.push(parseInt(event.source.value))
    }
    else {
      let index = this.selectedRoles.findIndex(x => x.value == event.source.value);
      this.selectedRoles =  this.selectedRoles.filter(item => item !== parseInt(event.source.value))
    }
  }

  addUser() {
    if (this.userForm.valid) {
      const user = new addUserDTO(this.userForm.controls.username.value, this.userForm.controls.mobile.value, this.userForm.controls.email.value, this.userForm.controls.password.value, this.userForm.controls.isActive.value, this.userForm.controls.imageAvatar.value.toString(), this.selectedRoles)
      console.log(user)
      this.api.addUser(user).subscribe(res=> {
        if(res.status==="Success") {
          this.toastr.success('user successfully added', '');
          this.router.navigate(['/user/list']);
        }
        if(res.status==="Error") {
          this.toastr.error(res.description, 'Error');
        }
      })
    }
    else {
      this.userForm.markAllAsTouched();
    }
  }
}
