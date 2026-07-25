import AdoptionDao from "../dao/mongo/adoption.dao.js";

class AdoptionService {
    constructor() {
        this.adoptionDao = new AdoptionDao();
    }

    async getAll() {
        return await this.adoptionDao.getAll();
    }

    async getById(id) {
        return await this.adoptionDao.getById(id);
    }

    async create(data) {
        return await this.adoptionDao.create(data);
    }

    async update(id, data) {
        return await this.adoptionDao.update(id, data);
    }

    async delete(id) {
        return await this.adoptionDao.delete(id);
    }
}

export default new AdoptionService();