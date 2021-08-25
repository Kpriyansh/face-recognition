import React from 'react';
import Styles from './Signin.module.css'
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    handleSignin = () => {
       
        fetch('http://localhost:3002/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'Not found' || data === 'Incorrect password') {
                    alert(data);
                }
                else {
                   
                    this.props.loadUser(data);
                    this.props.newRoute();
                }

            })


    }
    render() {
        return (
            <div className={Styles.Box}>
                <article className={`br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5`}>
                    <main className="pa4 black-80 ">
                        <div className={`measure ${Styles.Form}`} style={{ textAlign: 'center', fontFamily: 'monospace' }} >
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className={`f1 fw8 ph0 mh0 ${Styles.Leg}`} >Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        onChange={this.handleEmailChange}
                                        className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email" name="email-address" id="email-address"
                                        required />
                                </div>
                                <div className="mv3">
                                    <label className={`db fw6 lh-copy f6`} htmlFor="password">Password</label>
                                    <input
                                        onChange={this.handlePasswordChange}
                                        className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password" name="password" id="password"
                                        required />
                                </div>

                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.handleSignin}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
                                    style={{ border: '2px solid black' }}
                                    type="submit"
                                    value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={this.props.goToRegister} className={`br2 f6 link dim black db ${Styles.Register}`} style={{ cursor: 'pointer' }}>Register</p>

                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}
export default SignIn;