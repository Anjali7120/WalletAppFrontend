import { useEffect, useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";

import { CSVLink } from "react-csv";

import axios from "axios";
const WalletTransactionsListing = () => {
    const [walletData, walletDataChange] = useState(null);
    const [sort,sortChange]=useState("");
    const { walletId } = useParams();
    console.log(walletId);
    const navigate = useNavigate();
    const csvData =[
        ["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"],["","","","","","","","",""],
      ];

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet-transaction?wallet_id=" +  walletId)
        .then((res) => {
            console.log(res.data)
            return res.data;

        })
        .then((resp) => {
            walletDataChange(resp);
            if(walletData.length>0)
            csvData =[
                ["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"],
                ...walletData.map(({ id, type, amount, balance, remarks, transaction_id ,createdAt}) => [
                  id,
                  type,
                  amount,
                  balance,
                  remarks,
                  transaction_id,
                  createdAt
                ]),
              ];
        
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet-transaction?wallet_id=" +  walletId+ "&sort="+sort)
        .then((res) => {
            console.log(res.data)
            return res.data;

        })
        .then((resp) => {
            walletDataChange(resp);
            if(walletData.length>0)
            csvData =[
                ["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"],
                ...walletData.map(({ id, type, amount, balance, remarks, transaction_id ,createdAt}) => [
                  id,
                  type,
                  amount,
                  balance,
                  remarks,
                  transaction_id,
                  createdAt
                ]),
              ];
        
        }).catch((err) => {
            console.log(err.message);
        })
    }, [sort])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>List of Wallet Transactions</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                    <a onClick={() => { navigate("/wallet/transaction/create/" + walletId); }} className="btn btn-success">Add New Wallet Transaction (+)</a>
                    </div>
                    <div className="divbtn">
                    <CSVLink className="btn btn-success" filename="my-file.csv" data={csvData}>
                    Export to CSV
                    </CSVLink>
                    </div>

                    <div className="divbtn">
                    <a onClick={() => { sortChange('createdAt') }} className="btn btn-success">sortBy Created At</a>
                    </div>

                    <div className="divbtn">
                    <a onClick={() => { sortChange('amount') }} className="btn btn-success">sortBy Amount</a>
                    </div>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>type</td>
                                <td>amount</td>
                                <td>balance</td>
                                <td>remarks</td>
                                <td>transaction_id</td>
                                <td>Created At</td>
                                    
                                {/* <td>Action</td> */}
                            </tr>
                        </thead>
                        <tbody>

                            {walletData &&
                                walletData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.remarks}</td>
                                        <td>{item.transaction_id}</td>
                                        <td>{item.createdAt}</td>
                                        {/* <td>
                                            <a onClick={() => { navigate("/wallet/transactions/" + item.id); }} className="btn btn-success">Show Transactions</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                            <a onClick={() => { LoadWallet(item.id) }} className="btn btn-primary">Go to Wallet</a>
                                        </td> */}
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

export default WalletTransactionsListing;