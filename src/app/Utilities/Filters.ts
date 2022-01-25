import { userRolesDTO } from './../DTOs/UserDTO';
import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';

@Pipe({ name: 'userRoleFilter' })
export class UserRoleFilter implements PipeTransform {
  transform(items: userRolesDTO[], id: number | any): userRolesDTO[] {
    return items?.filter(it=>it.userId === id);
  }
}