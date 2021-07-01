export interface IComment {
    TYPEID: string;
    content: string;
    REFERENCE: string;
    
}

class Comment implements IComment {

    public TYPEID: string;
    public content: string;
    public REFERENCE: string;
    constructor(id: string, content: string, parent: string) {
        if(id.startsWith("A#" || "U#")){
            this.TYPEID = id;
        } else {
            this.TYPEID = "#";
        }
        this.content = content;
        this.REFERENCE = parent; 

    }
    public normalize(c : IComment) {
        if(!(c.TYPEID.startsWith("A#" || "U#"))){
            c.TYPEID = "#";
        }
        return c;
    }
    
}

export default Comment;
