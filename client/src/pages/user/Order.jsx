import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Order = () => {
  return (
    <Layout title={'your orders'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3"> <UserMenu/> </div>
          <div className="col-md-9">All orders</div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
