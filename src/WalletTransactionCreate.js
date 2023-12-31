import { useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
const WalletTransactionCreate = () => {
    const { walletId } = useParams();

    const[id,idchange]=useState("");
    const[amount,amountchange]=useState(0);
    const[type,typechange]=useState(1);
    const[remarks,remarkschange]=useState('');
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const walletData=
      {
        wallet_id : Number(walletId),
        amount: Number(amount),
        remarks : remarks,
        type: Number(type)
      };
      
      axios.post("http://localhost:8010/wallet/add-wallet-transaction",  walletData
      ).then((res)=>{
        alert('Saved successfully.')
        navigate('/wallet/transaction/'+walletId);
      }).catch((err)=>{
        alert(err.response.data.message? err.response.data.message : err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Create Wallet Transaction</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Wallet ID</label>
                                            <input value={walletId} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Amount</label>
                                            <input required value={amount} onMouseDown={e=>valchange(true)} onChange={e=>amountchange(e.target.value)} className="form-control"></input>
                                        {amount.length==0 && validation && <span className="text-danger">Enter the amount</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Remarks</label>
                                            <input value={remarks} onChange={e=>remarkschange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label class="container">Debit
                                                <input type="radio" checked={type==1} value={1}
                                                onChange={e=>typechange(e.target.value)}
                                                name="radio"></input>
                                            </label>
                                            <label class="container">Credit
                                                <input type="radio"checked={type==2 } value={2}
                                                onChange={e=>typechange(e.target.value)}
                                                name="radio"></input>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <a className="btn btn-danger"
                                            href={"/wallet/transaction/"+walletId}>Back</a>
                                          
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default WalletTransactionCreate;