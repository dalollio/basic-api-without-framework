const { readFile, writeFile } = require('fs/promises');
const _database = '../../database/data.json';

class HeroRepository {
    constructor({file}){
        this.file = file;
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    async find(itemId) {
        const all = await this._currentFileContent();
        if(!itemId) return all;

        return all.find(({ id })=> itemId === id);
    }

    async create(data){
        const all = await this._currentFileContent();
        all.push(data);

        await writeFile(this.file, JSON.stringify(all))

        return data.id;
    }

    async delete(itemId){
        const all = await this._currentFileContent();
        const results = all.filter(data=> data.id !== itemId);
        await writeFile(this.file, JSON.stringify(results))
        return all.length > results.length;
    }
}

module.exports = HeroRepository;

// const testRepository = new HeroRepository({file:_database});
// testRepository.find()
//     .then(data=> console.log(data))
//     .catch(err=>console.error(err))
//     .finally(()=>console.log("END"))
