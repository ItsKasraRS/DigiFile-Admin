import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/Services/Role/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  loaded = false;
  roles = null;
  constructor(private api: RoleService) { }

  ngOnInit(): void {
    
    this.api.getRoles().subscribe(res=> {
      this.roles = res.data;
      this.loaded = true;
      console.log(this.roles);
    }, err => console.log(err));
  }

  deleteRole(id, item) {

  }
}
