import { useState, useEffect } from "react";
import axios from "axios";
import useGetUserDetails from "../hooks/useGetUserDetails";
import { URL_PATH } from "../utils/urls";
import { Link } from "react-router-dom";

const UserBooks = () => {
    const { user, err } = useGetUserDetails();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            console.log(user);
            if (user && user.id) {
                console.log(user.id);
                try {
                    const response = await axios.get(`${URL_PATH}/transactions/getBorrowedBooks`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        params: {
                            userId: user.id
                        }
                    });
                    console.log(response.data.data);
                    setBooks(response.data.data);
                } catch (error) {
                    console.error("Failed to fetch borrowed books", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        getBooks();
    }, [user]);

    if (err) {
        return <div>{err}</div>;
    }

    if (loading) {
        return <div>Loading books...</div>;
    }

    return (
        <div className="h-screen bg-gray-900 text-white p-8">
            <h1 className="text-center font-extrabold text-2xl mb-8">BOOKS ISSUED BY YOU</h1>
                        {books.length > 0 ? (
                <div className="space-y-4">
                    {books.map((book) => (
                        <div 
                            key={book.book_id} 
                            className="my-3 mx-4 py-3 px-6 bg-gray-700 flex items-center rounded-md"
                        >
                            <div className="flex-1 min-w-[200px] font-semibold">{book.title}</div>
                            <div className="min-w-[120px] text-center mr-5">
                                Issue Date: {book.borrow_date}
                            </div>
                            <Link to="/returnBook" state={{ book }}>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                    RETURN
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">No Books Issued</div>
            )}
        </div>
    );
}

export default UserBooks;
