const {User, Books, Transaction} = require('../models/index');

class TransactionRepository {
    async create(data) {
        try {
            const user = await User.findByPk(data.userId);
            const book = await Books.findByPk(data.bookId);
        
            if (!user || !book) {
                throw { error: 'User or Book not found' };
            }
        
            if (!book.availability_status) {
                throw { error: 'Book is not available' };
            }
    
            // Check if book is already issued to this user and create if not
            const [transaction, created] = await Transaction.findOrCreate({
                where: {
                    user_id: data.userId,
                    book_id: data.bookId,
                    return_date: null
                },
                defaults: {
                    borrow_date: new Date()
                }
            });
    
            if (!created) {
                throw { message: 'Book already issued by you' };
            }
    
            // Decrease book quantity if issued successfully
            let val = book.quantity;
            await book.update({ quantity: val - 1 });
    
            if (val === 1) {
                await book.update({ availability_status: false });
            }
        
            return book;
        } catch (error) {
            console.log('Something went wrong in repository layer:', error.message);
            throw error;
        }
    }
    

    async returnBook(data) {
        try {
            const transaction = await Transaction.findOne({
                where: {
                    user_id: data.userId,
                    book_id: data.bookId,
                    return_date: null
                }
            });
            
            if (!transaction) {
                throw new Error('Transaction not found');
            }
    
            const book = await Books.findByPk(data.bookId);
            if (!book) {
                throw new Error('Book not found');
            }
            transaction.return_date = new Date();
            await transaction.save();

            let val = book.quantity;
            await book.update({ quantity: val + 1 });
            await book.update({ availability_status: true });
    
            return book;
        } catch (error) {
            console.error('Error in repository layer:', error.message);
            throw error; 
        }
    }

    async getById(data) {
        try {
            const transaction = await Transaction.findOne({
                where: {
                    user_id: data.userId,
                    book_id: data.bookId,
                    return_date: null
                }
            });
            
            if (!transaction) {
                throw new Error('Transaction not found');
            }
            return transaction;
        } catch (error) {
            console.error('Error in repository layer:', error.message);
            throw error; 
        }
    }

    async getBorrowedBooks(data) {
        try {
            const transactions = await Transaction.findAll({
                where: {
                    user_id: data.userId,
                    return_date: null
                }
            });

            if (!transactions || transactions.length === 0) {
                return [];
            }
    
            const books = await Promise.all(
                transactions.map(async (t) => {
                    const book = await Books.findByPk(t.book_id);
                    const formattedDate = new Date(t.borrow_date).toLocaleDateString('en-GB');
                    console.log(t);
                    return {
                        user_id: t.user_id,
                        author: book.author,
                        publication_year: book.publication_year,
                        book_id: t.book_id,
                        borrow_date: formattedDate,
                        title: book ? book.title : "Unknown Book"
                    };
                })
            );
    
            return books;
        } catch (error) {
            console.error('Error in repository layer:', error.message);
            throw error; 
        }
    }
    
}


module.exports = TransactionRepository;