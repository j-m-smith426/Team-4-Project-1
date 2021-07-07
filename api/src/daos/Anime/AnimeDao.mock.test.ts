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
    test('Testing error for invalid anime', async()=>{
        let id = 'errorPlease';
        const anime = new AnimeDao();
        expect(await anime.getOne(id)).toThrowError();
    })
}
addGet();

/*async function getOneWrong() {
    test('faulty anime not in database to return an error', async() =>{
        let id = 'bestID';
        let genres = ['fighting'];
        let name = 'CoryInTheHouse';
        let testUser:IAnime = {
            TYPEID:'A#'+id,
            REFERENCE:"0",
            genres,
            name:name
        };
        const anime = new AnimeDao();
        expect(await anime.getOne(id)).toBeUndefined();
    })
}
getOneWrong();
*/
async function getAllAnime(){
    test('Retrieving all anime', async() => {
        const anime = new AnimeDao();
        expect(await anime.getAll()).toBeTruthy();
    })
}
getAllAnime();