import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const WalletDetail = () => {
    const  walletUserId  = localStorage.getItem('walletUserId');
const walletId=0;
    const [WalletData, WalletDataChange] = useState({});

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet?wallet_user_id=" + walletUserId)
        .then((res) => {
            return res.data[0];
        }).then((resp) => {
            WalletDataChange(resp);
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
                    <h2>Wallet </h2>
                </div>
                <div className="card-body"></div>
                {console.log( Object.keys(WalletData).length)}
                {WalletData &&  Object.keys(WalletData).length==0&&
                <div>
                  <Link to="/wallet/create" className="btn btn-success">Setup Wallet(+)</Link>
                </div>    
                }
                {WalletData &&Object.keys(WalletData).length>0 &&
                    <div>
                   
                        <h2>The Wallet User name is : <b>{WalletData.wallet_user_name}</b></h2>
                        <h5>Balance is : {WalletData.balance}</h5>
                       
                        <a className="btn btn-success"
                        target='blank'
                        href={"/wallet/transaction/" + WalletData.id}>Go To Transactions</a>

                         <a className="btn btn-primary"
                        href={"/"}>Go back to User</a>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default WalletDetail;