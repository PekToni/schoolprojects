export class Reply {
    constructor(
        private user: string,
        private title: string,
        private message: string,
        public edit: false
    ) {}
}
