export class Webuser {
    private userid: string;
    private password: string;
    private email: string;
    private role: string;
    private gameid: string;
    public token: string;

    constructor(userid, password, email, role, gameid, token) {
        this.userid = userid;
        this.password = password;
        this.email = email;
        this.role = role;
        this.gameid = gameid;
        this.token = token;
    }
}
