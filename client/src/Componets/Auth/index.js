import Header from "../header"
import { PiStudentFill } from "react-icons/pi"; 
import { GrUserWorker } from "react-icons/gr";
import { RiParentFill } from "react-icons/ri";
import "./index.css"
import { Link } from "react-router-dom";

const Auth = () => {
    return(
        <div className="auth-main-conteiner">
            <Header/>
            <div className="auth-items-container">
                <ul className="auth-user-items">
                    <li className="auth-user-icon"><PiStudentFill /></li>
                    <li className="auth-user-icon"><GrUserWorker /></li>
                    <li className="auth-user-icon"><GrUserWorker /></li>
                </ul>
                </div>
                <div className="auth-login-card">
                    <h1>Login</h1>
                    <label>Username/Email</label>
                    <input type="text"/>
                    <label>Password</label>
                    <input type="password"/>
                    <p className="auth-option"><Link className="auth-link" to="signup">Forget Password/SignUp</Link> User</p>
                </div>
        </div>
    )
}

export default Auth