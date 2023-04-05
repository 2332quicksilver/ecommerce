import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contacts ">
        <div className="col-md-6 ">
          <img
            src="/images/contacts.jpeg"
            alt="contacts"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7 available         
          </p>
          <p className="mt-3">
            <BiMailSend /> : vm7740014@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 6388779243
          </p>
          <p className="mt-3">
            <BiSupport /> : https://github.com/wishallmaurya/ecommerce.git
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
