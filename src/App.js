import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CekResiPage from "./pages/CekResiPage";
import CekOngkirPage from "./pages/CekOngkirPage";
import PelayananPage from "./pages/PelayananPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import InformasiPage from "./pages/InformasiPage";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";

//Admin Pages
import HistoryPage from "./pages/AdminPages/HistoryPage"
import ShipmentPage from "./pages/AdminPages/ShipmentPage"
import ManageKurirPage from "./pages/AdminPages/ManageKurirPage";

//User Pages
import TrackPage from "./pages/UserPages/TrackPage"

//Kurir Pages
import UpdatePage from "./pages/KurirPages/UpdatePage"

import { Routes, Route } from 'react-router-dom'
import { loginAction, keepLogin } from './actions'
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let token = localStorage.getItem("shopToken")
    console.log(token)
    if (token) {
      this.props.keepLogin(token)
    }
  }

  render() {
    return (
      <div>
        <Navbar brand="JoExpress" />
        <div style={{ minHeight: "85vh" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="cekresi/" element={<CekResiPage />} />
            <Route path="cekongkir/" element={<CekOngkirPage />} />
            <Route path="pelayanan/" element={<PelayananPage />} />
            <Route path="tentangkami/" element={<TentangKamiPage />} />
            <Route path="informasi/" element={<InformasiPage />} />
            {/* <Route path="signin/" element={<SignInPage />} /> */}
            {/* <Route path="signup/" element={<SignUpPage />} /> */}
            {
              this.props.role === "Admin" ?
                <>
                  <Route path="/shipment-admin" element={<ShipmentPage />} />
                  <Route path="/history-admin" element={<HistoryPage />} />
                  <Route path="/manage-kurir" element={<ManageKurirPage />} />
                </>
                :
                // this.props.role === "kurir" ?
                <>
                  <Route path="/update-status" element={<UpdatePage />} />
                </>
              // :
              // <>
              //   <Route path="/track" element={<TrackPage />} />
              // </>
            }
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapToProps = (globalState) => {
  return {
    role: globalState.authReducer.role
  }
}

export default connect(mapToProps, { loginAction, keepLogin })(App);