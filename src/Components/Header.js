import React, { useEffect, useState } from "react";
import { APIURL } from "../Utils/url.js";

function Header() {
  const id = localStorage.getItem("userID");
  const [User, setUser] = useState();
  useEffect(() => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/users/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUser(result.data.user))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <React.Fragment>
      <div className="header">
        <div className="Header container">
          <div className="logo">Pic Battle</div>
          {User ? (
            <a
              className="btn btn-primary logout"
              href="/"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
