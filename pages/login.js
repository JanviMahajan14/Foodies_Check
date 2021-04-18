import Link from 'next/link'
import { useState } from 'react';
import baseUrl from "../utils/baseUrl";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const res = await fetch(`${baseUrl}api/login`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        cookie.set("token",data.token)
        cookie.set("role",data.user.role)
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/");
      } catch (error) {
        toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
      }
    };

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={(e)=>{handleSubmit(e)}}>
                        <h2 className="title">LogIn</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Then Signup and start Ordering !
                        </p>
                        <Link href="/signup"><a><button className="btn transparent" id="sign-up-btn">Sign up</button></a></Link>
                    </div>
                    <img src="/log.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
}
 
export default LogIn;