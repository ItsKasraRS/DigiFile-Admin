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
  constructor(private api: UserService) { }

  ngOnInit(): void {
    this.api.userList().subscribe(res=> {
      if(res.status === "Success") {
        this.users = res.data.userList;
      }
    })
    
    this.api.getUserRoles().subscribe(res=> {
      if (res.status === "Success") {
        this.roles = res.data;
        console.log(this.roles);
      }
    })
  }

}
