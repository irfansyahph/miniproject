import React from "react";
import axios from "axios";
import { Button, Modal, Table } from 'reactstrap'
import { BsPlusSquareFill } from 'react-icons/bs'
import { API_URL } from "../../helper";

class ManageKurirPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalSignUp: false,
            modalEdit: false,
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        axios.get(`${API_URL}/users/get`)
            .then((res) => {
                // console.table(res.data)
                this.setState({ users: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    printData = () => {
        let { users } = this.state

        return users.map((value, index) => {
            return <tr>
                <th>{index + 1}</th>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.telp}</td>
            </tr >
        })
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

    render() {
        let { modalSignUp } = this.state;
        return (
            <div className="container p-4" >
                <h3 className="text-center">Manage Kurir</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="secondary" outline type="button" onClick={() => this.setState({ modalSignUp: !modalSignUp })}>
                        <BsPlusSquareFill /> Add Data
                    </Button>
                </div>
                <Modal isOpen={modalSignUp} toggle={() => this.setState({ modalSignUp: !modalSignUp })}>
                    <div className="m-auto pt-4" style={{ width: "85%" }}>
                        <h2 className="text-center">Register Kurir</h2>
                        <div className="form-group py-3">
                            <label>Username</label>
                            <input type="text" className="form-control" ref="username" />
                        </div>
                        <div className="form-group py-3">
                            <label>Email</label>
                            <input type="text" className="form-control" ref="email" />
                        </div>
                        <div className="form-group py-3">
                            <label>Phone</label>
                            <input type="text" className="form-control" ref="phone" />
                        </div>
                        <div className="form-group py-3">
                            <label>Password</label>
                            <input type={this.state.passType} className="form-control" ref="password" />
                        </div>
                        <div className="form-group py-3">
                            <label>Confirm Password</label>
                            <input type={this.state.passType} className="form-control" ref="confPassword" />
                        </div>
                        <button type="button" className="btn btn-info" style={{ float: "right", marginBottom: "10px" }} onClick={this.btnSignUP}>Sign Up</button>
                    </div>
                </Modal>
                <Table dark bordered responsive>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Telp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ManageKurirPage;