import { useEffect, useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";

import { CSVLink } from "react-csv";

import axios from "axios";
const WalletTransactionsListing = () => {
    const [walletData, walletDataChange] = useState(null);
    const [sort,sortChange]=useState("");
    const { walletId } = useParams();
    const [csv,csvChange]= useState([["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"]]);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet-transaction?wallet_id=" +  walletId)
        .then((res) => {
            return res.data;

        })
        .then((resp) => {
            walletDataChange(resp);
            if(resp.length>0)
              { 
                let csvData =[
                ["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"],
                ...resp.map(({ id, type, amount, balance, remarks, transaction_id ,createdAt}) => [
                  id,
                  type,
                  amount,
                  balance,
                  remarks,
                  transaction_id,
                  createdAt
                ]),
              ];
              csvChange(csvData);
            }
        
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        axios
		.get("http://localhost:8010/wallet/get-wallet-transaction?wallet_id=" +  walletId+ "&sort="+sort)
        .then((res) => {
            return res.data;

        })
        .then((resp) => {
            walletDataChange(resp);
            if(resp.length>0)
            {
                let csvData =[
                ["ID", "Type", "Amount", "Balance", "Remarks", "Transaction Id", "Created At"],
                ...resp.map(({ id, type, amount, balance, remarks, transaction_id ,createdAt}) => [
                  id,
                  type,
                  amount,
                  balance,
                  remarks,
                  transaction_id,
                  createdAt
                ]),
              ];
              csvChange(csvData)
            }
        
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

                    <CSVLink className="btn btn-success" filename="my-file.csv" data={csv}>
                    Export to CSV
                    </CSVLink>
                    </div>

                    <div className="divbtn">
                    <a onClick={() => { sortChange('createdAt') }} className="btn btn-success">sortBy Created At</a>
                    </div>

                    <div className="divbtn">
                    <a onClick={() => { sortChange('amount') }} className="btn btn-success">sortBy Amount</a>
                    </div>

                    <div className="divbtn">
                    <a onClick={() => { navigate("/wallet") }} className="btn btn-primary">Go back to Wallet</a>
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