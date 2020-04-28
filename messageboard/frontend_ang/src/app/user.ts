export class User {
    constructor(
        public _id: string,
        private username: string,
        private email: string,
        private password: string,
        private isuser: boolean,
        private isadmin: boolean,
        public edit: false
    ) {}
}
