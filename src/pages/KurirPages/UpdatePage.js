import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { API_URL } from "../../helper";


class UpdatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: [],
            modalUpdate: false,
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.getShipments()
    }

    getShipments = () => {
        axios.get(`${API_URL}/shipments/get`)
            .then((res) => {
                // console.table(res.data)
                this.setState({ shipments: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    btEdit = (index) => {
        this.setState({ modalUpdate: !this.state.modalUpdate, selectedIndex: index })
    }

    btSaveEdit = () => {
        let { shipments, selectedIndex, modalUpdate } = this.state

        let resi = shipments[selectedIndex].resi
        let status = this.refs.updateStatus.value

        axios.patch(`${API_URL}/shipments/update-status`, {
            resi, status
        })
            .then((res) => {
                this.getShipments()
                this.setState({ selectedIndex: null, modalUpdate: !modalUpdate })
            }).catch((err) => {
                console.log(err)
            })
    }

    printData = () => {
        return this.state.shipments.map((value, index) => {
            return <tr>
                <th>{index + 1}</th>
                <td>{value.stats[0].resi}</td>
                <td>{value.stats[0].status}</td>
                <td>{value.stats[0].date}</td>
                {/* <td>{value.status}</td> */}
                <td className="text-center">
                    <Button color="warning" size="sm" onClick={() => this.btEdit(index)}>Update</Button>
                </td>
            </tr >
        })
    }

    render() {
        let { modalUpdate, shipments, selectedIndex } = this.state;
        return (
            <div className="container p-4">
                <h3 className="text-center">Update Shipment Status</h3>
                {
                    selectedIndex != null ?
                        <Modal isOpen={modalUpdate} toggle={() => this.setState({ modalUpdate: !modalUpdate })}>
                            <ModalHeader><h4 style={{ alignItems: "center" }}>Update Status</h4></ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="form-group ">
                                        <label>Status</label>
                                        <select className="form-control" ref="updateStatus" defaultValue={shipments[selectedIndex].status}>
                                            <option value={null}>Pilih Status</option>
                                            <option value="Dalam Perjalanan">Dalam Perjalanan</option>
                                            <option value="Dibawa Oleh Kurir">Dibawa Oleh Kurir</option>
                                            <option value="Terkirim">Terkirim</option>
                                        </select>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" outline color="warning" onClick={() => this.setState({ modalUpdate: !modalUpdate, selectedIndex: null })}>Cancel</Button>
                                <Button type="button" outline color="success" onClick={this.btSaveEdit}>Save</Button>
                            </ModalFooter>
                        </Modal>
                        :
                        null
                }
                <Table dark bordered responsive>
                    <thead className="text-center">
                        <tr>
                            <th>No.</th>
                            <th>Resi</th>
                            <th>Shipment Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UpdatePage;