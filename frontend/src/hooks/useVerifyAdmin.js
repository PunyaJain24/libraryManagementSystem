import axios from "axios";
import { useState, useEffect } from "react";
import { URL_PATH } from "../utils/urls";

const useVerifyAdmin = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios.get(`${URL_PATH}/user/isAdmin`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('authToken')
                },
            });
            setUser(response.data.data);
        } catch (err) {
            setError("Failed to fetch user");
            console.error(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return { user, error };
};
export default useVerifyAdmin;
