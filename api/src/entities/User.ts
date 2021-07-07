export interface IUser {
    TYPEID: string;
    REFERENCE: string;
    username: string;
    email: string;
    followed:string[]
    
}

class User implements IUser {

    public TYPEID: string;
    public username: string;
    public email: string;
    public REFERENCE: string;
    public followed:string[] = [];
    constructor(id: string, email: string, name: string) {
            this.username = name;
            this.email = email;
            if(id.startsWith("U#")){
                this.TYPEID = id;
            } else if (id.includes("#")) {
                this.TYPEID = "#";
            } else {
                this.TYPEID = "U#" +id;
            }
            this.REFERENCE = "0";

    }
    
    static normalize(u : IUser) {
        if(u.TYPEID.startsWith("U#")){
            return u;
        } else if (u.TYPEID.includes("#")) {
            u.TYPEID = "#";
        } else {
            u.TYPEID = "U#" + u.TYPEID;
        }
        u.REFERENCE = "0"; 
        return u;
    }
    
}

export default User;
