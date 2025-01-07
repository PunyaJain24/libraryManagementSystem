import { Link } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_PATH } from "../utils/urls";

const Browse = () => {
    let books = useGetBooks();


    return (
        <div className="h-screen bg-gray-900 text-white p-8">
            <h1 className="text-center font-extrabold text-2xl mb-8">Welcome! Enjoy exploring the LIBRARY.</h1>
            <div className="flex justify-between mx-3 my-10">
                <Link to='/addBook'>
                    <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">
                        + ADD BOOK
                    </button>
                </Link>
                <Link to='/account'>
                    <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">
                        YOUR BOOKS
                    </button>
                </Link>
            </div>
            <div className="items-center"><h1 className="font-bold text-xl my-4 text-center">Books in the Library's Collection</h1></div>
            <div className="space-y-4 h-[calc(100vh-240px)] overflow-y-auto"> {/* Adjust the height by subtracting the header and buttons area */}
                {books && books.length && books.map((book) => {
                    return (
                        <div 
                            key={book.id} 
                            className="my-3 mx-4 py-3 px-6 bg-gray-700 flex items-center rounded-md"
                        >
                            <div className="flex-1 min-w-[200px] font-semibold">{book.title}</div>
                            <div className="min-w-[120px] text-center">In Stock: {book.quantity}</div>
                            <Link 
                                to="/viewBook" 
                                state={{ book }}
                            >
                                <button className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md">
                                    VIEW
                                </button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Browse;
