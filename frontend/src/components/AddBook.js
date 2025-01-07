import { useState } from "react";
import useVerifyAdmin from "../hooks/useVerifyAdmin";
import axios from "axios";
import { URL_PATH } from "../utils/urls";

const AddBook = () => {
    const { user, error } = useVerifyAdmin();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publication_year: "",
        availability_status: true,
        quantity: 1,
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL_PATH}/books/create`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSuccessMessage("Book added successfully!");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Failed to add the book.");
            setSuccessMessage("");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-auto">
                <h1 className="text-2xl font-bold text-center text-white mb-4">Add New Book</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-white font-semibold">Book Name</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                            placeholder="Enter book name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white font-semibold">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                            placeholder="Enter author name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white font-semibold">Publication Year</label>
                        <input
                            type="number"
                            name="publication_year"
                            value={formData.publication_year}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                            placeholder="Enter publication year"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white font-semibold">Availability Status</label>
                        <input
                            name="availabilityStatus"
                            value={formData.availability_status}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-white font-semibold">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                            placeholder="Enter quantity"
                            min="1"
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            type="submit"
                            disabled={!user}
                            className="bg-blue-500 text-white px-6 py-3 font-semibold rounded-md hover:bg-blue-600 transition"
                        >
                            Add Book
                        </button>
                    </div>
                    <div className="items-center mt-2">
                        {!user && <p className="text-red-400 mt-2 text-center font-semibold">You do not have admin privileges and cannot add books.</p>}
                    </div>

                </form>
                {successMessage && (
                    <div className="text-green-500 mt-4 text-center">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default AddBook;
