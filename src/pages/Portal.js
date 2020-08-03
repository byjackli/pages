import React from 'react';
import firebase from '../config/firebase';

class Portal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            success: false,

            firstName: "",
            lastName: "",
            username: "",
            email: "",
        }
    }

    updateFirstname(e) { this.setState({ firstName: e.target.value }); }
    updateLastname(e) { this.setState({ lastName: e.target.value }); }
    updateUsername(e) { this.setState({ username: e.target.value }); }
    updateEmail(e) { this.setState({ email: e.target.value }); }

    createAccount(e) {
        e.preventDefault();
        let actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
            .then(() => {
                localStorage.setItem('emailForSignIn', this.state.email);
                localStorage.setItem("create", JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email,
                }));

                this.setState({ success: true })
            })
    }

    toggleRegister() { this.setState({ register: !this.state.register }); }
    renderRegister() {
        return (
            <div className="vrtTC register-container">
                <div className="header-wide vrtTL">
                </div>
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
                                    <h1>creating your account</h1>
                                </div>
                                <form className="vrtBT">
                                    <div className="vrtTL">
                                        <div className="input-container hrzTL">
                                            <div className="input-container">
                                                <p aria-hidden="true">first name</p>
                                                <input aria-label="first name" autocomplete="first name" name="first name" spellcheck="false" placeholder="first name" onChange={this.updateFirstname.bind(this)} />
                                            </div>
                                            <div className="input-container">
                                                <p aria-hidden="true">last name</p>
                                                <input aria-label="last name" autocomplete="last name" name="last name" spellcheck="false" placeholder="last name" onChange={this.updateLastname.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <p aria-hidden="true">username</p>
                                            <input aria-label="username" autocomplete="username" name="username" spellcheck="false" placeholder="username" onChange={this.updateUsername.bind(this)} />
                                        </div>
                                        <div className="input-container">
                                            <p aria-hidden="true">email address</p>
                                            <input aria-label="email" autocomplete="email" name="email" spellcheck="false" placeholder="email address" onChange={this.updateEmail.bind(this)} />
                                        </div>
                                    </div>
                                    <div>
                                        <button aria-label="create account" onClick={this.createAccount.bind(this)}>create account</button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div >
        )
    }
    renderFront() {
        return (<>
            <div className="header vrtCC">
                <div className="main vrtCC">
                    <h1 className="styleMega">pages.byjackli.com</h1>
                    <p className="style2">whatever you want it to be</p>
                </div>
                <div className="onhover">
                    <p className="styleMega">dumb simple way to build a website</p>
                </div>
            </div>
            <div className="action vrtCC">
                <p><button onClick={this.toggleRegister.bind(this)}>create account</button> and build your webpage</p>
                <p>or <button onClick={() => { window.location.href = "/explore" }}>explore</button> creations by other people</p>
            </div>
        </>)
    }

    render() {
        return (<main className="portal vrtCC">
            <button className="admin" onClick={() => { window.location.href = "/admin" }}>Admin Portal</button>
            {this.state.register
                ? this.renderRegister()
                : this.renderFront()
            }
            <ol className="nav2 hrzTL">
                <li>Created 2020.</li>
                <li><a href="/TOS">Terms and Conditions</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="https://byjackli.com/projects">Other Projects</a></li>
            </ol>
        </main>);
    }
}

export default Portal;