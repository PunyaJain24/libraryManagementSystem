import {useRef, useState} from "react"
import logImg from "../utils/loginImg.jpg"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {URL_PATH} from "../utils/urls"

const LoginForm = () => {
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [toggleIcon,setToggleIcon] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let userData = {
            email: email.current.value,
            password: password.current.value,
        };

        if(toggleIcon){
            let data = {name: name.current.value};
            userData = { ...userData, ...data };
        }

        try {
            const response = await axios.post(`${URL_PATH}/user/${toggleIcon ? "signUp" : "signIn"}`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.status === 201) {
                setSuccess("Your account created successfully!. Please Sign In below!");
                setError(null);
            } 
            if (response.status === 200) {
                setSuccess("Successfully Signed In");
                localStorage.setItem('authToken', response.data.data); 
                console.log(localStorage.getItem('authToken'));
                navigate("/browse");
            }
        } catch (err) {
            console.log(err);
            if (err.response?.status === 409) {
                setSuccess("User already registered! Please Sign In.");
                setError(null);
                setToggleIcon(false);
            } else {
                setError(err.response?.data?.message || `Failed to ${toggleIcon ? "signup" : "signIn"}.`);
                setSuccess(null);
            }
        }
    };

    return (
        <div>
            <div className="absolute -z-20 bg-gradient-to-l from-black">
                <img className="w-screen h-screen" src={logImg} alt="background-img"/>
            </div>
            <form onSubmit={handleSubmit} className="absolute bg-slate-700 shadow-2xl my-20 mx-[580px] w-6/12 p-12 text-white rounded-xl bg-opacity-30">
                <h1 className="font-bold text-gray-900 text-3xl py-4 text-center">{toggleIcon ? "Sign Up" : "SignIn"}</h1>
                
                {toggleIcon && <input 
                    ref={name} 
                    type="text" 
                    placeholder="Full Name" 
                    className="my-4 p-2 w-full rounded-lg bg-gray-800" 
                />}
                
                <input 
                    ref={email} 
                    type="text" 
                    placeholder="abc@gmail.com" 
                    className="my-4 p-2 w-full bg-gray-800 rounded-lg" 
                />
                
                <input 
                    ref={password} 
                    type="password" 
                    placeholder="Enter Password" 
                    className="my-4 p-2 w-full bg-gray-800 rounded-lg" 
                />
                
                <button 
                    className="my-5 p-2 bg-blue-600 font-bold w-full rounded-lg"
                    type="submit">
                    {toggleIcon ? "Sign Up" : "SignIn"}
                </button>

                <p 
                    className="cursor-pointer hover:text-blue-400" 
                    onClick={() => setToggleIcon(!toggleIcon)}>{toggleIcon ? "Already an account ? SignIn Now" : "New to Website ? Sign Up Now"}
                </p>

                {error && <p className="text-white-500 font-medium mt-1">{error}</p>}
                {success && <p className="text-green-500 mt-1">{success}</p>}
                
            </form>
        </div>
    );
};  

export default LoginForm;