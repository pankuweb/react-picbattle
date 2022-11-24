import React, { useState } from "react";
import "./../App.css";
import { APIURL } from "../Utils/url.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./../App.css";

function Signup() {
  const history = useHistory();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const signup = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      password: Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/users/signup`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("userID", result.id);
        if (result.status == "fail") {
          toast.error(result.message, {
            theme: "dark",
          });
        } else {
          toast.success("Registeration successfully!", {
            theme: "dark",
          });
          setTimeout(() => {
            history.push(`/`);
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
            <h2 className="text-center mb-3">Signup</h2>
            <form className="text-start">
              <div class="mb-3 text-start">
                <label for="exampleInputEmail1" class="form-label">
                  First Name
                </label>
                <input
                  type="firstname"
                  class="form-control"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3 text-start">
                <label for="exampleInputEmail1" class="form-label">
                  Last Name
                </label>
                <input
                  type="lastname"
                  class="form-control"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3 text-start">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
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
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="submitdata">
                <a
                  onClick={() => {
                    signup();
                  }}
                  class="btn btn-primary"
                >
                  Submit
                </a>
                <a href="/" class="create-account">
                  Already have account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
