import { useEffect, useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
const WalletListing = () => {
    const [walletData, walletDataChange] = useState(null);
    const { walletUserId } = useParams();
    const navigate = useNavigate();
    // const LoadDetail = (id) => {
    //     navigate("/wallet_user/detail/" + id);
    // }
    // const LoadEdit = (id) => {
    //     navigate("/wallet_user/edit/" + id);
    // }
    // const LoadWallet = (id) => {
    //     navigate("/wallet_user/wallet/" + id);
    // }
    // const Removefunction = (id) => {
    //     if (window.confirm('Do you want to remove?')) {
    //         fetch("http://localhost:8000/wallet_user/" + id, {
    //             method: "DELETE"
    //         }).then((res) => {
    //             alert('Removed successfully.')
    //             window.location.reload();
    //         }).catch((err) => {
    //             console.log(err.message)
    //         })
    //     }
    // }




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
                                            {/* <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                            <a onClick={() => { LoadWallet(item.id) }} className="btn btn-primary">Go to Wallet</a> */}
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