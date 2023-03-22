import { userRolesDTO } from './../DTOs/UserDTO';
import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';

@Pipe({ name: 'userRoleFilter' })
export class UserRoleFilter implements PipeTransform {
  transform(items: userRolesDTO[], id: number | any): userRolesDTO[] {
    return items?.filter(it=>it.userId === id);
  }
}

@Pipe({ name: 'subCategoryFilter', pure: false })
export class SubCategoryFilter implements PipeTransform {
  transform(items, id: number | any) {
    return items?.filter(it=>it.parentId === id);
  }
}

@Pipe({ name: 'permissionsFilter', pure: false })
export class PermissionsFilter implements PipeTransform {
  transform(items, id: number | any) {
    return items?.filter(it=>it.parentId === id);
  }
}