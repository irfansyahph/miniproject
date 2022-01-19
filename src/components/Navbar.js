import React from "react";
import axios from 'axios'
import { loginAction } from '../actions'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logoutAction } from '../actions'
import { BsFillEyeFill, BsFillEyeSlashFill, BsFillPersonFill } from "react-icons/bs"
import { Button, Modal } from "reactstrap";
import { API_URL } from '../helper';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSignin: false,
            modalSignUp: false,
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

    btnSignUP = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let telp = this.refs.phone.value
        let password = this.refs.password.value
        let confPassword = this.refs.confPassword.value

        // memeriksa kekuatan password

        if (email == "" || password == "" || confPassword == "") {
            alert(`FIll in form ❌`)
        } else {
            if (password == confPassword) {
                if (email.includes("@")) {
                    // Mengirim ke API menggunakan axios.post
                    axios.post(`${API_URL}/users/register`, {
                        username,
                        email,
                        telp,
                        password
                    }).then((res) => {
                        console.log(res)
                        if (res.data.success) {
                            this.setState({ redirect: true })
                            alert(res.data.message)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    alert(`Email failed ❌`)
                }
            } else {
                alert(`Password not match ❌`)
            }
        }
    }

    btnLogOut = () => {
        localStorage.removeItem("shopToken");
        this.props.logoutAction()
        this.setState({ redirect: true })
    }

    render() {
        let { modalSignin, modalSignUp } = this.state
        return (
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark `}>
                <Link className=" navbar-brand font-weight-bold" style={{ marginLeft: "2vw", fontSize: "30px" }} to="/">{this.props.brand}</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation" >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav" style={{ marginLeft:"25vw", fontSize: "18px" }}>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/cekresi">
                                Cek Resi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cekongkir">
                                Cek Ongkir
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/pelayanan">
                                Pelayanan
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/informasi">
                                Informasi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tentangkami">
                                Tentang Kami
                            </Link>
                        </li>
                    </ul>
                    {
                        this.props.idusers != null
                            ?
                            <div className="ml-auto" style={{ marginRight: "2vw" }}>
                                <div class="btn-group">
                                    <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsFillPersonFill /> Halo, {this.props.username}
                                    </button>
                                    <div className="dropdown-menu">
                                        {
                                            this.props.role == "Admin" ?
                                                <div>
                                                    <Link to="/shipment-admin" className="dropdown-item" style={{ cursor: "pointer" }}>Shipments</Link>
                                                    <Link to="/history-admin" className="dropdown-item" style={{ cursor: "pointer" }}>History</Link>
                                                    <Link to="/manage-kurir" className="dropdown-item" style={{ cursor: "pointer" }}>Manage Kurir</Link>
                                                </div>
                                                :
                                                this.props.role == "user" ?
                                                    <div>
                                                        <Link to="/track" className="dropdown-item" style={{ cursor: "pointer" }}>Track</Link>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Link to="/update-status" className="dropdown-item" style={{ cursor: "pointer" }}>Update</Link>
                                                    </div>
                                        }
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={this.btnLogOut}>Logout</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="btn-group btn-group-toggle" style={{ marginRight: "2vw", marginLeft: "auto" }} data-toggle="buttons" >
                                {/* <Link className="btn btn-primary" to="/signin">Sign In</Link> */}
                                {/* <Link className="btn btn-secondary" to="/signup">Sign Up</Link> */}
                                <Button color="primary" type="button" onClick={() => this.setState({ modalSignin: !modalSignin })}>
                                    Sign In
                                </Button>
                                <Modal isOpen={modalSignin} toggle={() => this.setState({ modalSignin: !modalSignin })}>
                                    <div className="m-auto pt-4" style={{ width: "85%" }}>
                                        <h2 className="text-center">Sign In</h2>
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
                                        <button type="button" className="btn btn-info" style={{ float: "right", marginBottom: "10px" }} onClick={this.btnSignIn}>Sign In</button>
                                    </div>
                                </Modal>
                            </div>
                    }
                </div>
            </nav>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        user: globalState.authReducer,
        idusers: globalState.authReducer.idusers,
        username: globalState.authReducer.username,
        email: globalState.authReducer.email,
        role: globalState.authReducer.role
    }
}

export default connect(mapToProps, { loginAction, logoutAction })(Navbar);