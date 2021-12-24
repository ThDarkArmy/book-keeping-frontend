import React, { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";
import axios from 'axios'


const BASE_URL = 'http://localhost:5678/api/v1'

const LoginRegister = () => {
  const [haveAccount, setHaveAccount] = useState(true);

  const handleHaveAccount = (value) => {
    console.log("Value", value);
    setHaveAccount(value);
  };

  const handleLogin = (formData) => {
    console.log({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  const handleRegister =async (formData) => {
        try{
            const response = await axios({
                method: "post",
                url: BASE_URL+"/users/register",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
              })

              console.log("Response Data", response)

        }catch(err){

        }
  };
  return (
    <div>
      <Header />
      {haveAccount ? (
        <Login
          handleHaveAccount={handleHaveAccount}
        />
      ) : (
        <Register
          handleHaveAccount={handleHaveAccount}
        />
      )}
    </div>
  );
};

export default LoginRegister;
