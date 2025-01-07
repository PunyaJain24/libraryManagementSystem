import {useEffect, useState} from "react";
import axios from "axios";
import {URL_PATH} from "../utils/urls"

const useUserBorrowedBooks = (id) => {
    const [booksData, setBooksData] = useState([]);
    const getBooks = async () => {
        if(id){
            const userData = {
                userId: id
            }
            const books = await axios.get(`${URL_PATH}/transactions/getBorrowedBooks`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log(books.data.data);
            setBooksData(books.data.data);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return booksData;
};
export default useUserBorrowedBooks;