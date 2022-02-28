import { UserImagePath } from './../../../Utilities/ApiPath';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../Services/User/user.service';
import { addUserDTO, editUserDTO, rolesDTO } from 'src/app/DTOs/UserDTO';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  imagePath = UserImagePath;
  userForm: FormGroup = null;
  userData: editUserDTO = null;
  roles: rolesDTO[];
  userRoles = [];
  selectedRoles = [];
  loaded = false;
  constructor(private api: UserService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.userForm = new FormGroup({
      userId: new FormControl(null),
      username: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      password: new FormControl(null, [Validators.maxLength(200), Validators.minLength(8)]),
      isActive: new FormControl(null),
      imageAvatar: new FormControl(null),
      selectedImage: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.api.getUserData(id).subscribe(res=> {
        this.userData = res.data;
        this.userForm.setValue({
          userId: res.data.userId,
          username: res.data.username,
          mobile: res.data.mobile,
          email: res.data.email,
          isActive: res.data.isActive,
          password: null,
          imageAvatar: res.data.avatarImage,
          selectedImage: null
        });
      })
      this.api.getRoles().subscribe(res => {
        if (res.status === "Success") {
          this.roles = res.data;
        }
      })
      this.api.getUserRoleUpdate(id).subscribe(res=> {
        this.userRoles = res.data;
        this.selectedRoles = res.data;
      })
    })
  }
  getUserRoleById(id) {
    return this.userRoles.filter(ur=>ur == id).length;
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userForm.patchValue({
          selectedImage: reader.result
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

  editUser() {
    if (this.userForm.valid) {
      const user = new editUserDTO(this.userForm.controls.userId.value, this.userForm.controls.username.value, this.userForm.controls.mobile.value, this.userForm.controls.email.value, this.userForm.controls.password.value, this.userForm.controls.isActive.value, this.userForm.controls.imageAvatar.value.toString(), this.userForm.controls.selectedImage.value.toString(), this.selectedRoles)
      this.api.updateUser(user).subscribe(res=> {
        if(res.status==="Success") {
          this.toastr.success('user has been updated successfully', '');
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
