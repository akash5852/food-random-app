import { useEffect, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom'
import axios from "axios";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory();

    const handleLogin = async (e) => {
   
        e.preventDefault();
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        try {
            const res = await axios.post("http://localhost:5000/login", user);
            let data = res.data;
            console.log(data.message);
            setErrorMessage(JSON.stringify(data.message));
            localStorage.setItem("token", data.token);
            history.go(0);


        } catch (e) {
            console.log(e);
        }
    
    }

    useEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? history.push("/") : null)
            .catch(err => setErrorMessage(err))
    }, [])





    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
            <div className="p-5 text-3xl font-extrabold">Login</div>
            <form className="mx-5 flex flex-col w-72" onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="username">Username</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input className="text-black m-3 border-2 border-green-400 p-1" type="password" name="password" id="password" />
                <input className="m-1 px-2 py-1 rounded font-bold text-xl bg-green-400 text-gray-900" type="submit" value="Login" />
                <div className="flex flex-row items-center justify-center">
                    <h1>Don't have an account?</h1>
                    <Link className="m-1 px-2 py-1 rounded font-bold text-xl border-2 border-green-400 text-green-400 text-center" to="/register">Register</Link>
                </div>

            </form>

        </div>
    )


}
export default Login