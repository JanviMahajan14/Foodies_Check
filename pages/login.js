import Link from 'next/link'

const LogIn = () => {
    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">LogIn</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
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