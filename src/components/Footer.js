import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <footer className="" style={{ paddingTop: "5vw", width: "100%", clear: "both", position: "relative", bottom: "0px" }}>
                <div className="footer-top bg-dark" style={{ paddingTop: '50px', position: 'relative', color: 'white' }}>
                    <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: "15px", paddingRight: "15px", maxWidth: "720px" }}>
                        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                            <div className="col-12" style={{ flex: "0 0 100%", maxWidth: "100%" }}>
                                <div className="row" style={{ display: "flex", flexWrap: "wrap", marginLeft: "-15px", marginRight: "-15px", textAlign: "center" }}>
                                    <div className="col-md-4" style={{ marginBottom: "25px" }}>
                                        <div className="footer-menu" style={{ marginTop: "10px", marginBottom: "30px", fontSize: "16px", fontWeight: "700" }}>
                                            INFORMASI
                                        </div>
                                        <ul className="menu-list" style={{ fontSize: "14px", listStyleType: "none", marginLeft: "-30px", fontWeight: "500" }}>
                                            <li>FAQ</li>
                                            <li>Terms & Condition</li>
                                            <li>Privacy Policy</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "25px" }}>
                                        <div className="footer-menu" style={{ marginTop: "10px", marginBottom: "30px", fontSize: "16px", fontWeight: "700" }}>
                                            LAYANAN
                                        </div>
                                        <ul className="menu-list" style={{ fontSize: "14px", listStyleType: "none", marginLeft: "-30px", fontWeight: "500" }}>
                                            <li>JoExpress X</li>
                                            <li>JoExpress Y</li>
                                            <li>JoExpress Z</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "25px" }}>
                                        <div className="footer-menu" style={{ marginTop: "10px", marginBottom: "30px", fontSize: "16px", fontWeight: "700" }}>
                                            INFO KONTAK
                                        </div>
                                        <ul className="menu-list" style={{ fontSize: "14px", listStyleType: "none", marginLeft: "-30px", fontWeight: "500" }}>
                                            <li>EMAIL</li>
                                            <li>WHATSAPP</li>
                                            <li>LINE</li>
                                        </ul>
                                    </div>
                                    <hr class="my-4" />
                                    <div style={{fontSize:"15px"}}>© 2022 JoExpress. All rights reserved.</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;