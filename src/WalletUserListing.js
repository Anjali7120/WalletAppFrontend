import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WalletUserListing = () => {
    const [walletUserData, walletUserDataChange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/wallet_user/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/wallet_user/edit/" + id);
    }
    const LoadWallet = (id) => {
        navigate("/wallet_user/wallet/" + id);
    }
    // const Removefunction = (id) => {
    //     if (window.confirm('Do you want to remove?')) {
    //         fetch("http://localhost:8010/wallet_user/" + id, {
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
        fetch("http://localhost:8010/wallet/get-wallet-user").then((res) => {
            return res.json();
        }).then((resp) => {
            walletUserDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Wallet User Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                    {walletUserData && walletUserData.length==0 &&
                        <Link to="wallet_user/create" className="btn btn-success">Add New User(+)</Link>
                    }
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {walletUserData &&
                                walletUserData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                             <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                            <a onClick={() => { LoadWallet(item.id) }} className="btn btn-primary">Go to Wallet</a>
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

export default WalletUserListing;