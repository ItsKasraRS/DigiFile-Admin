import { stringify } from "@angular/compiler/src/util"

export class addUserDTO {
    constructor(
        public username: string,
        public mobile: string,
        public email: string,
        public password: string,
        public isActive: boolean,
        public avatarImage: string,
        public roles: rolesDTO[]
    ) { }
}

export class rolesDTO {
    constructor(
        public id: number,
        public roleName: string
    ) {}
}

export class userRolesDTO {
    constructor(
        public userId: number,
        public roleName: string
    ) {}
}