import Link from 'next/link'

const SignUp = () => {
    return (
        <div className="container sign-up-mode">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
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