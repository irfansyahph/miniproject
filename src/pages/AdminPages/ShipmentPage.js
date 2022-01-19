import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import { BsFillTrashFill, BsPencilSquare, BsPlusSquareFill } from 'react-icons/bs'
import { API_URL } from "../../helper";

class ShipmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: [],
            modal: false,
            modalEdit: false,
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

    printData = () => {
        let { shipments } = this.state

        return shipments.map((value, index) => {
            return <tr>
                <th>{index + 1}</th>
                <td>{value.resi}</td>
                <td>
                    Nama: {value.namapengirim}<hr />
                    No. Telpon: {value.telponpengirim}<hr />
                    Alamat: {value.alamatpengirim}
                </td>
                <td>
                    Nama: {value.namapenerima}<hr />
                    No. Telpon: {value.telponpenerima}<hr />
                    Alamat: {value.alamatpenerima}
                </td>
                <td>
                    Jenis Barang: {value.jenisbarang}<hr />
                    Berat Barang: {value.beratbarang.toLocaleString()} kg<hr />
                    Biaya Jasa: Rp {value.biayajasa.toLocaleString()}
                </td>
                {/* <td>{value.status}</td> */}
                <td className="text-center">
                    <Button outline color="warning" size="sm" onClick={() => this.btEdit(index)}><BsPencilSquare /></Button>
                    <Button outline color="danger" size="sm" onClick={() => this.btDelete(value.resi)}> <BsFillTrashFill /></Button>
                </td>
            </tr >
        })
    }

    btInputData = () => {
        let namapengirim = this.refs.namapengirim.value
        let telponpengirim = this.refs.telponpengirim.value
        let alamatpengirim = this.refs.alamatpengirim.value
        let namapenerima = this.refs.namapenerima.value
        let telponpenerima = this.refs.telponpenerima.value
        let alamatpenerima = this.refs.alamatpenerima.value
        let jenisbarang = this.refs.jenisbarang.value
        let beratbarang = parseInt(this.refs.beratbarang.value)
        let biayajasa = parseInt(this.refs.biayajasa.value)
        // let status = this.refs.status.value

        if (namapengirim == "" || telponpengirim == "" || alamatpengirim == "" || namapenerima == "" || telponpenerima == "" || alamatpenerima == "" || jenisbarang == "" || beratbarang == "" || biayajasa == "") {
            alert("Form tidak boleh kosong")
        } else {
            if (isNaN(beratbarang) || isNaN(biayajasa)) {
                alert("Salah input data Berat Barang atau Biaya Jasa")
            } else {
                axios.post(`${API_URL}/shipments/input`, {
                    namapenerima,
                    telponpenerima,
                    alamatpenerima,
                    namapengirim,
                    telponpengirim,
                    alamatpengirim,
                    jenisbarang,
                    beratbarang,
                    biayajasa
                }).then((res) => {
                    this.getShipments()
                    this.setState({ modal: !this.state.modal })
                }).catch((err) => {
                    console.log(err)
                });
                // axios.post(`${API_URL}/shipments/input`,{
                    
                // })
            }
        }
    }

    btSaveEdit = () => {
        let { shipments, selectedIndex, modalEdit } = this.state

        let resi = shipments[selectedIndex].resi
        let namapengirim = this.refs.editNamapengirim.value
        let telponpengirim = this.refs.editTelponpengirim.value
        let alamatpengirim = this.refs.editAlamatpengirim.value
        let namapenerima = this.refs.editNamapenerima.value
        let telponpenerima = this.refs.editTelponpenerima.value
        let alamatpenerima = this.refs.editAlamatpenerima.value
        let jenisbarang = this.refs.editJenisbarang.value
        let beratbarang = parseInt(this.refs.editBeratbarang.value)
        let biayajasa = parseInt(this.refs.editBiayajasa.value)


        axios.patch(`${API_URL}/shipments/update`, {
            resi, namapengirim, telponpengirim, alamatpengirim, namapenerima,
            telponpenerima, alamatpenerima, jenisbarang, beratbarang, biayajasa
        })
            .then((res) => {
                this.getShipments()
                this.setState({ selectedIndex: null, modalEdit: !modalEdit })
            }).catch((err) => {
                console.log(err)
            })
    }

    btEdit = (index) => {
        this.setState({ modalEdit: !this.state.modalEdit, selectedIndex: index })
    }

    btDelete = (resi) => {
        axios.delete(`${API_URL}/shipments/delete/${resi}`)
            .then((res) => {
                this.getShipments()
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        let { modal, modalEdit, shipments, selectedIndex } = this.state;
        return (
            <div className="container p-4" >
                <h3 className="text-center">Shipments</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="secondary" outline type="button" onClick={() => this.setState({ modal: !modal })}>
                        <BsPlusSquareFill /> Add Data
                    </Button>
                </div>
                {/* Modal add shipments */}
                <Modal isOpen={modal} toggle={() => this.setState({ modal: !modal })}>
                    <ModalHeader><h4 style={{ alignItems: "center" }}>Shipments Data</h4></ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Nama Penerima</label>
                                <input type="text" className="form-control" ref="namapenerima" />
                            </div>
                            <div className="form-group col-6">
                                <label>No. Telepon Penerima</label>
                                <input type="text" className="form-control" ref="telponpenerima" />
                            </div>
                            <div className="form-group">
                                <label>Alamat Penerima</label>
                                <textarea className="form-control" ref="alamatpenerima" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Nama Pengirim</label>
                                <input type="text" className="form-control" ref="namapengirim" />
                            </div>
                            <div className="form-group col-6">
                                <label>No. Telepon Pengirim</label>
                                <input type="text" className="form-control" ref="telponpengirim" />
                            </div>
                            <div className="form-group">
                                <label>Alamat Pengirim</label>
                                <textarea className="form-control" ref="alamatpengirim" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Jenis Barang</label>
                                    <input type="text" className="form-control" ref="jenisbarang" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Berat barang (kg)</label>
                                    <input type="text" className="form-control" ref="beratbarang" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Biaya Jasa</label>
                                    <input type="text" className="form-control" ref="biayajasa" />
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" outline color="success" onClick={this.btInputData}>Submit</Button>
                    </ModalFooter>
                </Modal>
                {/* Modal edit product */}
                {
                    selectedIndex != null ?
                        <Modal isOpen={modalEdit} toggle={() => this.setState({ modalEdit: !modalEdit })}>
                            <ModalHeader>Edit Poduct</ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>Nama Penerima</label>
                                        <input type="text" className="form-control" ref="editNamapenerima"
                                            defaultValue={shipments[selectedIndex].namapenerima} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>No. Telepon Penerima</label>
                                        <input type="text" className="form-control" ref="editTelponpenerima"
                                            defaultValue={shipments[selectedIndex].telponpenerima} />
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Penerima</label>
                                        <textarea className="form-control" ref="editAlamatpenerima"
                                            defaultValue={shipments[selectedIndex].alamatpenerima} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>Nama Pengirim</label>
                                        <input type="text" className="form-control" ref="editNamapengirim"
                                            defaultValue={shipments[selectedIndex].namapengirim} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>No. Telepon Pengirim</label>
                                        <input type="text" className="form-control" ref="editTelponpengirim"
                                            defaultValue={shipments[selectedIndex].telponpengirim} />
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Pengirim</label>
                                        <textarea className="form-control" ref="editAlamatpengirim"
                                            defaultValue={shipments[selectedIndex].alamatpengirim} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Jenis Barang</label>
                                            <input type="text" className="form-control" ref="editJenisbarang"
                                                defaultValue={shipments[selectedIndex].jenisbarang} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Berat barang (kg)</label>
                                            <input type="text" className="form-control" ref="editBeratbarang"
                                                defaultValue={shipments[selectedIndex].beratbarang} />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Biaya Jasa</label>
                                            <input type="text" className="form-control" ref="editBiayajasa"
                                                defaultValue={shipments[selectedIndex].biayajasa} />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" outline color="warning" onClick={() => this.setState({ modalEdit: !modalEdit, selectedIndex: null })}>Cancel</Button>
                                <Button type="button" outline color="success" onClick={this.btSaveEdit}>Save</Button>
                            </ModalFooter>
                        </Modal>
                        :
                        null
                }
                <Table dark bordered responsive>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Resi</th>
                            <th>Data Pengirim</th>
                            <th>Data Penerima</th>
                            <th>Data Barang</th>
                            {/* <th>Status</th> */}
                            <th>Action</th>
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

export default ShipmentPage;