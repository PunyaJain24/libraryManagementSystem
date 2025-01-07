const BookRepository = require('../repository/books-repository');

const bookRepository = new BookRepository();

const create = async (req, res) => {
    try {
        const response = await bookRepository.create(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new Book item',
            data: response,
            err: {}
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error 
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await bookRepository.update(req.body, req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully updated the Book',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error 
        });
    }
}

const remove = async (req, res) => {
    try {
        await bookRepository.delete(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the book item',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error 
        });
    }
}

const getList = async (req, res) => {
    try {
        const response = await bookRepository.getAll();
        return res.status(200).json({
            success: true,
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error 
        });
    }
}

const getBook = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({
                message: 'Book name is required.',
                data: {},
                err: {}
            });
        }
        const response = await bookRepository.getByName({ title: name });
        return res.status(200).json({
            success: true,
            data: response,
            err: {}
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error
        });
    }
};


module.exports = {
    create,
    update,
    remove,
    getBook,
    getList
};