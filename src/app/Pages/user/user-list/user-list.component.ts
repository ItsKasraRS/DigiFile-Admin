import { ToastrService } from 'ngx-toastr';
import { rolesDTO, userRolesDTO } from './../../../DTOs/UserDTO';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  roles: userRolesDTO[];
  constructor(private api: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.userList().subscribe(res=> {
      if(res.status === "Success") {
        this.users = res.data.userList;
      }
    })
    
    this.api.getUserRoles().subscribe(res=> {
      if (res.status === "Success") {
        this.roles = res.data;
      }
    })
  }
  deleteUser(id: number, item)  {
    this.api.deleteUser(id).subscribe(res=> {
      if(res.status === "Success") {
        const index = this.users.indexOf(item);
        if (index !== -1) {
          this.users.splice(index, 1);
      }  
        this.toastr.success('user has been removed successfully', '');
      }
    })
  }
}
