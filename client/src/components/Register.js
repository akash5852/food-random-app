//register component
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
            const res = await axios.post("https://food-random-app.herokuapp.com/register", user);
            let data = res.data;

            setErrorMessage(data.message);

            console.log(data.message);
            if (data.message === "User has been added") {
                history.push("/login")
            }
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
            .catch(err => console.log(err))
    }, [history])




    return (
        <div className="text-white flex flex-col h-screen w-screen items-center justify-center">
            <div className="h2 pb-2 text-decoration-underline">Register</div>
            <form className="d-flex justify-content-center vw-100 " onSubmit={(e) => handleRegister(e)}>
                <div className='mb-3'>
                    <div className="mb-3">
                        <label required htmlFor="username" className="form-label">Username</label>
                        <input required className="form-control" id="username" aria-describedby="username" />
                    </div>
                    <div className="mb-3">
                        <label required htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input required type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>

            </form>
            <div>{errorMessage}</div>
            <div className="justify-content-center">
                <div className='d-block'>
                    <p className="h3 pt-5">Already have an account? </p>
                </div>
                <div className='d-block'>
                    <Link className="h3 pt-5" to="/login">Login</Link>
                </div>
            </div>

        </div>
    )


}
export default Register