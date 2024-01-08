import React, { useEffect, useState } from "react";
import axios from "axios";
import FetchMenuAdmin from "../Admin/FetchMenuAdmin";
import MenuForm from "../Admin/MenuForm";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  const handleNative = () => {
    navigate("/selectfood");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/foodselection/getFamusItemsObj`)
      .then((response) => {
        // debugger;
        // Handle the response from the API call
        console.log("Response from DB: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching selected days:", error);
      });

    let Admin = localStorage.getItem("showAdminUI");
    let x = JSON.parse(Admin);
    console.log(typeof x);
    if (x === true) setIsAdmin(true);
    else setIsAdmin(false);
  }, []);

  if (isAdmin) {
    return (
      <>
        <br />
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "ActiveBorder",
          }}
        >
          Update Menu
        </h1>
        <FetchMenuAdmin />
        <br />
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "ActiveBorder",
          }}
        >
          Create New Menu
        </h1>
        <MenuForm />
        <button
          style={{
            display: "flex",
            background: "#880016",
            color: "#fff",
            padding: "15px 30px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "70%",
            marginLeft: "200px",
            marginTop: "30px",
            // background: #880016,
            // color: #fff;
            // padding: 15px 30px;
            // border: none;
            // border-radius: 4px;
            // justify-content: center;
            // align-items: center;
            // cursor: pointer;
            // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            // transition: background 0.3s, transform 0.2s;
            // font-size: 18px;
          }}
          onClick={handleNative}
        >
          Get the user enterprise
        </button>
      </>
    );
  } else {
    return <h2 style={{ textAlign: "center" }}>🚫Access Denied 🚫</h2>;
  }
};

export default AdminPage;
