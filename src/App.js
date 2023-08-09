import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WalletUserListing from './WalletUserListing';
import WalletUserCreate from './WalletUserCreate';
import WalletUserDetail from './WalletUserDetail';
import WalletUserEdit from './WalletUserEdit';


import WalletListing from './WalletListing';
import WalletCreate from './WalletCreate';
import WalletTransactionsListing from './WalletTransactionsListing ';
import WalletTransactionCreate from './WalletTransactionCreate'
function App() {
  return (
    <div className="App">
      <h1>Wallet App</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WalletUserListing />}></Route>
          <Route path='/wallet_user/create' element={<WalletUserCreate />}></Route>
          <Route path='/wallet_user/detail/:walletUserId' element={<WalletUserDetail />}></Route>
          <Route path='/wallet_user/edit/:walletUserId' element={<WalletUserEdit />}></Route>
         
          <Route path='/wallet_user/wallet/:walletUserId' element={<WalletListing />}></Route>
          <Route path='/wallet/create/:walletUserId' element={<WalletCreate />}></Route>
          <Route path='/wallet/transaction/:walletId' element={<WalletTransactionsListing />}></Route>
          <Route path='/wallet/transaction/create/:walletId' element={<WalletTransactionCreate />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
