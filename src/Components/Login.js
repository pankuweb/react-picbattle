import React, { useState } from "react";
import "./../App.css";
import { APIURL } from "../Utils/url.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: Email,
      password: Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/users/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("userID", result.id);
        localStorage.setItem("UserDetail", JSON.stringify(result));
        if (result.status == "fail") {
          toast.error(result.message, {
            theme: "dark",
          });
        } else {
          toast.success("Logging in successfully!", {
            theme: "dark",
          });
          setTimeout(() => {
            // history.push(`/battle/${result.id}`);
            // window.location.href = `/battle/${result.id}`;
            window.location.href = `/profile/${result.id}`;
          }, 2000);
        }
      })
      .catch((error) => {});
  };
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="col-sm-5 mx-auto">
          <div className="card  p-5">
            <h2 className="text-center mb-3">Login</h2>
            <form className="text-start">
              <div class="mb-3 text-start">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3 text-start">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="submitdata">
                <a
                  onClick={() => {
                    login();
                  }}
                  class="btn btn-primary"
                >
                  Submit
                </a>
                <a href="/signup" class="create-account">
                  Create your account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
