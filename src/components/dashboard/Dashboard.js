import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

const Dashboard = function(props) {

  if(!props.data.isAuthenticated) {
    return (
      <h1>Please <Link to="/login">log in</Link> to view your dashboard.</h1>
    );
  }
  if(props.data.isAdmin) {
    return <Redirect to="/adminDashboard" />;
  }
  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      {/* <ProductList /> */}
    </div>
  );
}

export default withRouter(Dashboard);
