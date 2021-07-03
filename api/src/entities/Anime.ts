export interface IAnime {
    TYPEID: string;
    REFERENCE: string;
    name: string;
    genres: string[];
    
}

class Anime implements IAnime {

    public TYPEID: string;
    public name: string;
    public genres: string[];
    public REFERENCE: string = "0";
    constructor(id: string, name: string, genres: string[]) {
        if(id.startsWith("A#")){
            this.TYPEID = id;
        } else if (id.includes("#")) {
            this.TYPEID = "#";
        } else {
            this.TYPEID = "A#" + id;
        }
        this.name = name;
        this.genres = genres;
        this.REFERENCE = "0"; 

    }
    static normalize(a : IAnime) {
        if(a.TYPEID.startsWith("A#")){
            a.REFERENCE = "0";
            return a;
        } else if (a.TYPEID.includes("#")) {
            a.TYPEID = "#";
        } else {
            a.TYPEID = "A#" + a.TYPEID;
        }
        a.REFERENCE = "0"; 
        return a;
    }
    
}

export default Anime;
