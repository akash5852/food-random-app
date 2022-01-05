import { useLayoutEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
            .then(data => data.isLoggedIn ? history.push("/") : null)
            .catch(err => setErrorMessage(err))
    }, [history])




    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
            <div className="h2 p-5  ">Register</div>
            <form className="mx-5 " onSubmit={(e) => handleRegister(e)}>
                <div className='d-block'>
                    <label required className="d-inline  m-2" htmlFor="username">Username: </label>
                    <input required className="d-inline m-2" type="text" name="username" id="username" />
                    <label required className="d-inline m-2" htmlFor="password">Password: </label>
                    <input required className="d-inline  m-2" type="password" name="password" id="password" />
                    <input className="m-1 px-2 py-1 " type="submit" value="Register" />
                </div>

                <div className="justify-content-center">
                    <div className='d-block'>
                        <p className="h3 pt-5">Already have an account? </p>
                    </div>
                    <div className='d-block'>
                        <Link className="h3 pt-5" to="/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )


}
export default Register