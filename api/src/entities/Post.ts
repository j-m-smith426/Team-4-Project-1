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
        if(id.startsWith("U#") || id.startsWith("A#")){
            this.TYPEID = id;
        } else {
            this.TYPEID = "#";
        }
        this.content = content;
        this.REFERENCE = parent; 

    }
    static normalize(c : IComment) {
        if(!(c.TYPEID.startsWith("U#") || c.TYPEID.startsWith("A#"))){
            c.TYPEID = "#";
        }
        return c;
    }
    
}

export default Comment;
