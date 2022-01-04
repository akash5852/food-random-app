import { useLayoutEffect, useState  } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'
import axios from "axios";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        try {
            await axios.post("http://localhost:5000/register", user);
        } catch (e) {
            console.log(e);
        }

    }
    
    useLayoutEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"): null)
        .catch(err => setErrorMessage(err)) 
    }, [history])

    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
        <div className="p-5 text-3xl font-extrabold">Register</div>
        <form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleRegister(e)}>
            <label htmlFor="username">Username</label>
            <input className="text-black m-3 border-2 border-green-400 p-1" type="text" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input className="text-black m-3 border-2 border-green-400 p-1" type="password" name="password" id="password" />
            <input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Register"/>
            <div className="flex flex-row items-center justify-center">
                <h1>Already have an account?</h1>
                <Link className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center" to="/login">Login</Link>
            </div>            </form>
    </div>
    )


}
export default Register