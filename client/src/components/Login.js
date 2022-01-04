import { useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
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
            console.log(data);
            localStorage.setItem("token", data.token);
            console.log(data.token);
        } catch (e) {
            console.log(e);
        }

    }
    
    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"): null)
    }, [])

    return (
        <form onSubmit={e => handleLogin(e)}>
            <input required />
            <input required type ="password"/>
            <input type = "submit" value= "Subimt"/>
        </form>
    )


}
export default Login