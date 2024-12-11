export class Comments {
    public user_name: string;
    public date_comment: Date;
    public message: string;
    constructor(name: string, date: Date, message: string) {
        this.user_name = name;
        this.date_comment = date;
        this.message = message;
    }
}
