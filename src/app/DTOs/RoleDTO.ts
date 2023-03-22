export class AddRoleDTO {
    constructor(
        public title: string,
        public selectedPermissions: number[]
    ) {}
}