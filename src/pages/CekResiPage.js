import React from "react";
import axios from "axios";
import { API_URL } from "../helper";
import { BsSearch } from "react-icons/bs";
import { Button, Card, CardSubtitle, CardText } from "reactstrap";

class CekResiPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: []
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

    printResi = () => {
        let { shipments } = this.state

        return shipments.map((value, index) => {
            return <div>
                Resi: {value.resi} Status: {value.status}
            </div>
        })
    }

    render() {
        return (
            <div>
                <div class="input-group rounded" style={{ width: "100%", paddingLeft: "20vw", paddingTop: "20vw", paddingRight: "20vw" }}>
                    <input type="search" class="form-control rounded" placeholder="Inputkan nomor resi anda" />
                    <Button size="md" type="button" >
                        <BsSearch />
                    </Button>
                </div>
                {/* <div>
                    <Card style={{ width: "50%", marginLeft: "25vw", marginTop: "2vw" }}>
                        <CardSubtitle>Resi</CardSubtitle>
                        <CardText>
                            {this.printResi()}
                        </CardText>
                    </Card>
                </div> */}
            </div>
        );
    }
}

export default CekResiPage;

