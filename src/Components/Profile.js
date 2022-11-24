import React, { useEffect, useState } from "react";
import { APIURL } from "../Utils/url.js";
import Pagination from "react-js-pagination";

function Profile() {
  const id = localStorage.getItem("userID");
  const [User, setUser] = useState();
  const [Battles, setBattles] = useState();

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

    //   Get battels
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/battle`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBattles(result.data.battle))
      .catch((error) => console.log("error", error));
  }, []);
  const userBattles = Battles
    ? Battles?.filter((i) => i?.user_aid?._id == id)
    : "";
  const userMoreBattles = Battles
    ? Battles?.filter((i) => i?.user_bid?._id == id)
    : "";
  const userAllBattles = userBattles?.concat(userMoreBattles);
  // console.log(userAllBattles);
  // console.log(User);
  return (
    <React.Fragment>
      <section>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-md-9 col-lg-7 col-xl-5">
              <div class="card" style={{ borderRadius: "15px" }}>
                <div class="card-body p-4">
                  <div class="d-flex text-black">
                    <div class="flex-shrink-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image"
                        class="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h5 class="mb-3">
                        {User?.firstName} {User?.lastName}
                      </h5>
                      {/* <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                        Senior Journalist
                      </p> */}
                      <div
                        class="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div>
                          <p class="small text-muted mb-1">Total Matches</p>
                          <p class="mb-0">41</p>
                        </div>
                        <div class="px-3">
                          <p class="small text-muted mb-1">Total Likes</p>
                          <p class="mb-0">976</p>
                        </div>
                        <div>
                          <p class="small text-muted mb-1">Rating</p>
                          <p class="mb-0">5*</p>
                        </div>
                      </div>
                      <div class="d-flex pt-1">
                        <a
                          href="/select-battle"
                          type="button"
                          class="btn btn-primary flex-grow-1"
                        >
                          Start Battle
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="data container">
        <h2 className="text-center mb-3">Recent 5 Battles</h2>
        <div className="col-sm-6 mx-auto">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vs</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {userAllBattles
                ? userAllBattles?.map((i, index) => {
                    const res =
                      i?.user_a?.like > i?.user_b?.like ? "Won" : "Lose";
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {i?.user_aid?.firstName}/{i?.user_bid?.firstName}
                        </td>
                        <td>{res}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
