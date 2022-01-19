import axios from "axios";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { Button, Card, Modal } from "reactstrap";
import GambarEkspedisi from '../ekspedisi.jpg'
import { API_URL } from "../helper";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipments: [],
      searchResult: {},
      modal: false
    }
  }

  componentDidMount() {
    this.getShipments()
  }

  getShipments = () => {
    let resi = this.refs.resi.value
    axios.get(`${API_URL}/shipments/get?resi=${resi}`)
      .then((res) => {
        console.table(res.data)
        // this.setState({ shipments: res.data })
      }).catch((err) => {
        console.log(err)
      })
  }

  printResi = () => {
    let { searchResult } = this.state

    return <div>
      Resi: {searchResult.resi} <br />
      Status: {searchResult.status}
    </div>
    // let { shipments } = this.state

    // return shipments.map((value, index) => {
    //   return <div>
    //     Resi: {value.stats[0].resi} Status: {value.stats[0].status}
    //   </div>
    // })
  }

  btSearch = () => {
    let { modal, shipments } = this.state
    let resi = this.refs.resi.value
    let obj = shipments.find(o => o.resi === parseInt(resi))

    if (resi == "") {
      alert(`Inputkan resi anda pada form`)
    } else if (resi == parseInt(resi)) {
      console.log(resi)
      this.setState({ searchResult: obj })
      this.setState({ modal: !modal })
    } else {
      alert(`Resi tidak ditemukan`)
    }
  }

  render() {
    let { modal } = this.state
    return (
      < div className="container-fluid" >
        <div className="row py-5">
          <div className="col-6">
            <div class="jumbotron">
              <h1 class="display-3 font-weight-bold">Zero Waste</h1>
              <p class="lead" style={{ fontSize: "27px" }}>We provide on time delivery and accurate shipping rate with 100% satisfaction guarantee.</p>
              <hr class="my-4" />
              <p>Dont' miss out on our New Year Promo!</p>
            </div>
          </div>
          <div className="col-6">
            <img src={GambarEkspedisi} alt='Truck' style={{ width: "100%" }} />
            <div class="input-group rounded">
              <input type="search" class="form-control rounded" placeholder="Inputkan nomor resi anda" ref="resi" />
              <Button size="md" type="button" onClick={this.btSearch} >
                <BsSearch />
              </Button>
              <Modal size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={modal} toggle={() => this.setState({ modal: !modal })}>
                <div>{this.printResi()}</div>
              </Modal>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='text-center' style={{ marginTop: "10px", textDecoration: "underline" }}><h1>Services</h1></div>
          <div className='text-center' style={{ marginTop: "10px", backgroundColor: "#212529", display: "flex", justifyContent: "space-evenly" }}>
            <Card className="col-md-3 my-2" style={{ height: "400px", backgroundColor: "#E0FFFF" }}>
              <h1>
                Layanan X
              </h1>
            </Card>
            <Card className="col-md-3 my-2" style={{ height: "400px", backgroundColor: "#E0FFFF" }}>
              <h1>
                Layanan Y
              </h1>
            </Card>
            <Card className="col-md-3 my-2" style={{ height: "400px", backgroundColor: "#E0FFFF" }}>
              <h1>
                Layanan Z
              </h1>
            </Card>
          </div>
        </div>
      </div >
    );
  }
}

export default LandingPage;
