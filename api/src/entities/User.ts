export interface IUser {
    TYPEID: string;
    REFERENCE: string;
    email: string;
    followed:string[]
    
}

class User implements IUser {

    public TYPEID: string;
    public email: string;
    public REFERENCE: string;
    public followed:string[] = [];
    constructor(id: string, email: string) {
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
    //normalize data so it can be submitted without problem.
    static normalize(u : IUser) {
        u.REFERENCE = "0"; 
        if(u.TYPEID.startsWith("U#")){
            return u;
        } else if (u.TYPEID.includes("#")) {
            u.TYPEID = "#";
        } else {
            u.TYPEID = "U#" + u.TYPEID;
        }
        return u;
    }
    
}

export default User;
