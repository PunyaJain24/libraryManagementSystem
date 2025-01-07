import { useLocation } from "react-router-dom";
import useGetUserDetails from "../hooks/useGetUserDetails";
import axios from "axios";
import { URL_PATH } from "../utils/urls";
import { useState } from "react";

const IssueBook = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const location = useLocation();
    const { book } = location.state || {};

    const { user, err } = useGetUserDetails();

    if (err) {
        return <div>{err}</div>;
    }

    if (!book) {
        return <div>No Book Details Available</div>;
    }

    if (!user) {
        return <div>Loading user details...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const userData = {
            userId: user.id,
            bookId: book.id 
        }
        try {
            const response = await axios.post(`${URL_PATH}/transactions/borrowBook`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data);
            if (response.status === 201) {
                setSuccess("Successfully issued the book");
                setError(null);
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setError("You already issued this book.");
                setSuccess(null);
            } else {
                setError(error.response?.data?.message || "Failed to issue.");
                setSuccess(null);
            }
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg grid grid-cols-2 gap-10 w-full max-w-5xl">
                
                {/* Left Section - Book Details */}
                <div className="flex flex-col justify-center items-center border-r pr-8 text-white">
                    <h1 className="text-3xl font-bold mb-6">Book Details</h1>
                    <div className="space-y-4">
                        <p className="text-lg">
                            <strong className="text-blue-400">Title:</strong> <span className="font-semibold">{book.title}</span>
                        </p>
                        <p className="text-lg">
                            <strong className="text-blue-400">Author:</strong> <span className="font-semibold">{book.author || "Unknown"}</span>
                        </p>
                        <p className="text-lg">
                            <strong className="text-blue-400">Published Year:</strong> <span className="font-semibold">{book.publication_year || "N/A"}</span>
                        </p>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="text-white">
                    <h1 className="text-2xl font-bold mb-6 text-center">Issue Book</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                        <label className="font-medium">Name:</label>
                        <input 
                            type="text"
                            value={user.name}
                            className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
                            readOnly
                        />
                        
                        <label className="font-medium">Book:</label>
                        <input  
                            type="text"
                            value={book.title}
                            className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
                            readOnly
                        />
                        
                        <label className="font-medium">Issue Date:</label>
                        <input
                            type="text"
                            value={new Date().toLocaleDateString()}
                            className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
                            readOnly
                        />
                        
                        <label className="font-medium">Return Date:</label>
                        <input 
                            type="text"
                            placeholder="Return Date"
                            className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 text-white"
                        />
                        
                        <div className="col-span-2 flex justify-center mt-4">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 font-semibold rounded-md hover:bg-blue-600 transition"
                            type="submit"
                            disabled={success || error === "You already issued this book."}
                        >
                            Issue Book
                        </button>
                        </div>
                        {error && <p className="text-white-500 font-medium mt-1">{error}</p>}
                        {success && <p className="text-green-500 mt-1">{success}</p>}
                    </form> 
                </div>
            </div>
        </div>
    );
}

export default IssueBook;
