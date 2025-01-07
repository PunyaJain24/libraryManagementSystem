import {useEffect, useState} from "react";
import axios from "axios";
import {URL_PATH} from "../utils/urls"

const useGetBooks = () => {
    const [booksData, setBooksData] = useState([]);
    const getBooks = async () => {
        const books = await axios.get(`${URL_PATH}/books/getList`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setBooksData(books.data.data);
    }

    useEffect(() => {
        getBooks();
    }, []);

    return booksData;
};
export default useGetBooks;