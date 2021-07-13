import { IAnime } from "@entities/Anime";
import AnimeDao from "./AnimeDao.mock";


async function addGet(){
    test('Testing the adding and retreiving of One User',async() =>{
        let id = 'testId';
        let genres = ['fighting'];
        let name = 'DBZ';
        let testUser:IAnime = {
            TYPEID:'A#'+id,
            REFERENCE:"0",
            genres,
            name:name
        };
        const anime = new AnimeDao();
        await anime.add(testUser);
        expect(await anime.getOne(id)).toStrictEqual(testUser);
    })
}
addGet();

async function getAllAnime(){
    test('Retrieving all anime', async() => {
        const anime = new AnimeDao();
        expect(await anime.getAll()).toBeTruthy();
    })
}
getAllAnime();