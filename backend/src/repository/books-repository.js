const { Op } = require('sequelize');
const {Books} = require('../models/index');

class BooksRepository {
    async create(data) {
        try{
            const book = await Books.create({
                title: data.title,
                author: data.author,
                publication_year: data.publication_year,
                availability_status: data.availability_status,
                quantity: data.quantity,
              });
            return book;
        } catch(error) {
            console.log('Cannot able to create - error in repository layer');
            throw error;
        }
    }

    async update(data, bookId){
        try{
            const book = await Books.findByPk(bookId);
            if (!book) {
                throw new Error(`Book with id ${bookId} not found`);
            }
            book.quantity = data.quantity;
            book.availability_status = true;
            await book.save();
            return book;
        } catch(error) {
            console.log('Cannot able to update - error in repository layer');
            throw error;
        }
    }

    async delete(bookId){
        try{
            await Books.destroy({
                where: {
                    id: bookId
                }
            });
        } catch(error) {
            console.log('Cannot able to delete - error in repository layer');
            throw error;
        }
    }

    async getAll(){
        try{
            const books = await Books.findAll();
            const result = books.filter(b => b.quantity > 0);
            return result;
        } catch(error) {
            console.log('Cannot able to fetch the data - error in repository layer');
            throw error;
        }
    }

    async getByName(data) {
        try {
            const book = await Books.findOne({
                where: {
                    title: {
                        [Op.like]: `%${data.title}%`
                    }
                }
            });
            return book;
        } catch (error) {
            console.error('Error fetching data in repository layer:', error);
            throw error;
        }
    }
}

module.exports = BooksRepository;