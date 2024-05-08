import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CRSDash from './pages/CDSDash';
import ReviewSHG from './pages/ReviewSHG';
import Publishnoti from './pages/Publishnoti';
import PSDash from './pages/PSDash';
import ReviewMembers from './pages/ReviewMembers';
import WeeklyPayment from './pages/WeeklyPayment';
import LoanPayment from './pages/LoanPayment';
import ReqLoan from './pages/ReqLoan';
import Nominate from './pages/Nominate';
import MinuitsPrep from './pages/MinuitsPrep';
import MDash from './pages/MDash';
import Login from './pages/Login';
import  Landing  from './pages/Landing';
import Register from './pages/Register';
import SHGReg from './pages/SHGReg';
import MemberReg from './pages/MemberReg';
import ViewLoan from "./pages/ViewLoan";
import CreateMeet from "./pages/CreateMeet.js"




export default function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/regshg">
            <SHGReg/>
          </Route>
          <Route exact path="/memreg">
            <MemberReg/>
          </Route>
          <Route path="/cdsdash" exact>
            <CRSDash/>
          </Route>
          <Route path="/cdsdash/reviewshg">
            <ReviewSHG />
          </Route>
          <Route path="/cdsdash/publishnoti">
            <Publishnoti />
          </Route>
          <Route path="/psdash" exact>
            <PSDash />
          </Route>
          <Route path="/psdash/reviewmem" >
            <ReviewMembers />
          </Route>
          <Route path="/weeklypay" >
            <WeeklyPayment />
          </Route>
          <Route path="/loanpay" >
            <LoanPayment/>
          </Route>
          <Route path="/reqloan" >
            <ReqLoan/>
          </Route>
          <Route path="/nominate" >
            <Nominate/>
          </Route>
          <Route path="/psdash/minuits" >
            <MinuitsPrep/>
          </Route>
          <Route path="/mdash" >
            <MDash/>
          </Route>
          <Route path="/viewloan" >
            <ViewLoan/>
          </Route>
          <Route path="/createmeet" >
            <CreateMeet/>
          </Route>

          <Route path="*">
            {/* Default route (could be a 404 page) */}
            <p>Default Content</p>
          </Route>
        </Switch>
      </Router>

      {/* Your additional content */}
      {/* {typeof backendData.users === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} */}
    </div>
  );
}
