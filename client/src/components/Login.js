import { useLayoutEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
            
            localStorage.setItem("token", data.token);
            setErrorMessage(data.message);
            if(data.message === "Success"){
                history.go(0); 
            }
        } catch (e) {
            console.log(e);
        }

    }

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? history.push("/") : null)
            .catch(err => setErrorMessage(err))
    }, [history])





    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
            <div className="h2 p-5  ">Login</div>
            <form className="mx-5 " onSubmit={(e) => handleLogin(e)}>
                <div className='d-block'>
                    <label required className="d-inline  m-2" htmlFor="username">Username: </label>
                    <input required className="d-inline m-2" type="text" name="username" id="username" />
                    <label required className="d-inline m-2" htmlFor="password">Password: </label>
                    <input required className="d-inline  m-2" type="password" name="password" id="password" />
                    <input className="m-1 px-2 py-1 " type="submit" value="Login" />
                </div>
                <div>
            <div>{errorMessage}</div>
                </div>
                <div className="justify-content-center">
                    <div className='d-block'>
                        <p className="h3 pt-5">Don't have an account? </p>
                    </div>
                    <div className='d-block'>
                        <Link className="h3 pt-5" to="/register">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    )


}
export default Login