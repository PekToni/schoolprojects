export class Message {
    constructor(
        public _id: string,
        private user: string,
        public title: string,
        private message: string,
        public reply = [],
        public buttonVisible: boolean,
        public repliesVisible = false,
        public addReply = false,
        public edit = false
    ) {}
}
