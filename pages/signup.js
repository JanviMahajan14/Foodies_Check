import Link from 'next/link'
import { useState } from 'react';
import baseUrl from '../utils/baseUrl'
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            const res = await fetch(`${baseUrl}api/signup`, {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            });

            const data = await res.json();
            if (data.error) {
              throw new Error(data.error);
            }
            toast.success("SignUp Successful", {
              position: toast.POSITION.TOP_RIGHT,
            });
            router.push('/login')
        }
        catch (error) {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        }
    }


    return (
        <div className="container sign-up-mode">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-up-form" onSubmit={(e)=>handleSubmit(e)}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel"></div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Then Sign In and get Started!
                        </p>
                        <Link href="/login"><a><button className="btn transparent" id="sign-in-btn">LogIn</button></a></Link>
                    </div>
                    <img src="/register.svg" className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;