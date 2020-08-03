import React from 'react';
import firebase from '../config/firebase';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            success: false,
        }
    }

    componentDidMount() {
        // this.checkOwner();
    }

    checkOwner() {

    }
    login(e) {
        e.preventDefault();
        let actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
            .then(() => {
                localStorage.setItem('emailForSignIn', this.state.email);
                this.setState({ success: true })
            })
    }
    updateEmail(e) { this.setState({ email: e.target.value }); }

    render() {
        return (
            <main className="portal vrtCC">
                <div className="vrtTC register-container">
                    <div className="body vrtTL">
                        <div className="form-container">

                            {this.state.success
                                ? <>
                                    <div className="header">
                                        <p>pages.byjackli.com</p>
                                        <h1>check your email</h1>
                                    </div>
                                    <div>
                                        <p>Log in by clicking the link that was just sent to your email!</p>
                                    </div>
                                </>
                                : <>
                                    <div className="header">
                                        <p>pages.byjackli.com</p>
                                        <h1>Admin Login Portal</h1>
                                    </div>
                                    <form className="vrtBT">
                                        <div className="vrtTL">
                                            <div className="input-container">
                                                <p aria-hidden="true">email address</p>
                                                <input aria-label="email" autoComplete="email" name="email" spellCheck="false" placeholder="email address" onChange={this.updateEmail.bind(this)} />
                                            </div>
                                        </div>
                                        <div>
                                            <button aria-label="Back" type="reset" onClick={(e) => { e.preventDefault(); window.location.replace("/"); }}>Back</button>
                                            <button aria-label="Log In" type="submit" onClick={this.login.bind(this)}>Log In</button>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div >
                <ol className="nav2 hrzTL">
                    <li>Created 2020.</li>
                    <li><a href="/TOS">Terms and Conditions</a></li>
                    <li><a href="/careers">Careers</a></li>
                    <li><a href="https://byjackli.com/projects">Other Projects</a></li>
                </ol>
            </main>
        )
    }
}

export default Login