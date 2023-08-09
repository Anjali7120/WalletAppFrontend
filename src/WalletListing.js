import { useEffect, useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
const WalletListing = () => {
    const [walletData, walletDataChange] = useState(null);
    const { walletUserId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet?wallet_user_id=" +  walletUserId)
        .then((res) => {
            console.log(res.data)
            return res.data;

        })
        .then((resp) => {
            walletDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>List of Wallets</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                    <a onClick={() => { navigate("/wallet/create/" + walletUserId); }} className="btn btn-success">Add New Wallet (+)</a>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Wallet User Name</td>
                                <td>Balance</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {walletData &&
                                walletData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.wallet_user.name}</td>
                                        <td>{item.balance}</td>
                                        <td>
                                            <a onClick={() => { navigate("/wallet/transaction/" + item.id); }} className="btn btn-success">Show Transactions</a>
                                           
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default WalletListing;