import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const WalletUserDetail = () => {
    const { walletUserId } = useParams();

    const [walletUserData, walletUserDataChange] = useState({});

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet-user?id=" + walletUserId)
        .then((res) => {
            return res.data[0];
        }).then((resp) => {
            walletUserDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Wallet User Create</h2>
                </div>
                <div className="card-body"></div>

                {walletUserData &&
                    <div>
                        <h2>The Wallet User name is : <b>{walletUserData.name}</b>  ({walletUserData.id})</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is : {walletUserData.email}</h5>
                        <h5>Phone is : {walletUserData.phone}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default WalletUserDetail;