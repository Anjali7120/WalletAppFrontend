import { useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";

const WalletCreate = () => {
    const { walletUserId } = useParams();

    const[id,idchange]=useState("");
    const[balance,balancechange]=useState(0);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const walletData={wallet_user_id : Number(walletUserId),balance: Number(balance)};
      
      fetch("http://localhost:8010/wallet/add-wallet",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(walletData)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Wallet Create</h2>
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
                                            <label>Wallet User ID</label>
                                            <input value={walletUserId} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Balance</label>
                                            <input required value={balance} onMouseDown={e=>valchange(true)} onChange={e=>balancechange(e.target.value)} className="form-control"></input>
                                        {balance.length==0 && validation && <span className="text-danger">Enter the amount</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
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

export default WalletCreate;