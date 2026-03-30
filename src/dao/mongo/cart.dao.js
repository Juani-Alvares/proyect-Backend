import cartModel from '../models/cart.model.js';

export default class CartDao {
    async create() { return await cartModel.create({ products: [] }); }
    
    async getById(id) { 
        return await cartModel.findById(id).populate('products.product').lean(); 
    }

    async update(id, data) { return await cartModel.findByIdAndUpdate(id, data, { new: true }); }
}