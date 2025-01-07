const TransactionRepo = require('../repository/transaction-repository');
const repo = new TransactionRepo();

const create = async (req, res) => {
    try {
        const data = { userId: req.body.userId, bookId: req.body.bookId };
        const response = await repo.create(data);

        return res.status(201).json({
            message: 'Successfully created a transaction',
            data: response
        });
    } catch (error) {
        console.log('Error in creating book');
        return res.status(500).json({
            message: 'Something went wrong',
            err: error.message || 'Internal Server Error'
        });
    }
}

const returnBook = async (req, res) => {
    try {
        const data = { userId: req.body.userId, bookId: req.body.bookId };
        const response = await repo.returnBook(data);

        return res.status(201).json({
            message: 'Successfully returning a transaction',
            data: response
        });
    } catch (error) {
        console.log('Error in returning book');
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error.message || 'Internal Server Error'
        });
    }
}

const getById = async (req, res) => {
    try {
        const data = { userId: req.body.userId, bookId: req.body.bookId };
        const response = await repo.getById(data);

        return res.status(200).json({
            message: 'Successfully getting the book details',
            data: response
        });
    } catch (error) {
        console.log('Error in getting book');
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error.message || 'Internal Server Error'
        });
    }
}

const getBorrowedBooks = async (req, res) => {
    try {
        const data = { userId: req.query.userId };
        const response = await repo.getBorrowedBooks(data);

        return res.status(200).json({
            message: 'Successfully getting the books details',
            data: response
        });
    } catch (error) {
        console.log('Error in getting books');
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            err: error.message || 'Internal Server Error'
        });
    }
}

module.exports = {
    create,
    returnBook,
    getById,
    getBorrowedBooks
}