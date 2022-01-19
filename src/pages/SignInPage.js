import React from 'react';
import axios from 'axios'
import { loginAction } from '../actions'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { API_URL } from '../helper';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passVisible: <BsFillEyeFill />,
            redirect: false
        }
    }

    btnShowHide = () => {
        if (this.state.passType == "password") {
            this.setState({ passType: "text", passVisible: <BsFillEyeSlashFill /> })
        } else {
            this.setState({ passType: "password", passVisible: <BsFillEyeFill /> })
        }
    }

    btnSignIn = () => {
        let email = this.refs.email.value
        let password = this.refs.password.value

        if (email == "" || password == "") {
            alert(`FIll in form ❌`)
        } else {
            axios.post(`${API_URL}/users/login`, {
                email,
                password
            })
                .then((res) => {
                    console.log(res.data)
                    this.props.loginAction(res.data.loginData)
                    this.setState({ redirect: true })
                    // console.table(res.data)
                    // penyimpanan data pda browser
                    localStorage.setItem("shopToken", res.data.loginData.token)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        if (this.props.idusers) {
            // perintah redirect
            return (
                <Navigate to="/" />
            )
        }
        return (
            <div className="m-auto pt-4" style={{ width: "30%" }}>
                <h1 className="text-center">Sign In</h1>
                <div className="form-group py-3">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@mail.com" ref="email" />
                </div>
                <div className="form-group py-3">
                    <label>Password</label>
                    <div className="input-group">
                        <input type={this.state.passType} className="form-control" ref="password" />
                        <div className="input-group-append">
                            <span className="input-group-text" style={{ cursor: "pointer" }} onClick={this.btnShowHide}>{this.state.passVisible}</span>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-info" style={{ float: "right" }} onClick={this.btnSignIn}>Sign In</button>
            </div>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        idusers: globalState.authReducer.idusers
    }
}

export default connect(mapToProps, { loginAction })(SignInPage);