export class LoginDTO {
    constructor(
        public email: string,
        public password: string,
        public isRemember: boolean
    ) {}
}