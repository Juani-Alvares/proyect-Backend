import adoptionModel from "../models/adoption.model.js";

export default class AdoptionDao {

    async getAll() {
        return await adoptionModel.find().lean();
    }

    async getById(id) {
        return await adoptionModel.findById(id).lean();
    }

    async create(data) {
        return await adoptionModel.create(data);
    }

    async update(id, data) {
        return await adoptionModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    async delete(id) {
        return await adoptionModel.findByIdAndDelete(id);
    }

}