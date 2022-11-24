import React, { useEffect, useState, useMemo } from "react";
import "./../App.css";
import { APIURL } from "../Utils/url.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function ChooseBattle() {
  const history = useHistory();
  const [OponentID, setOponentID] = useState();
  const [Users, setUsers] = useState();
  const [User, setUser] = useState();
  // console.log(OponentID);
  const userDetail = localStorage.getItem("userID");
  const [img, setImg] = useState();

  const login = () => {
    // var myHeaders = new Headers();

    // var raw = JSON.stringify({
    //   user_a: {
    //     photo: "asdf",
    //     like: 0,
    //     win: false,
    //   },
    //   user_aid: User?.id,
    //   user_bid: OponentID,
    //   user_b: {
    //     photo: "asdf",
    //     like: 0,
    //     win: false,
    //   },
    //   time: 5,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${APIURL}/api/v1/battle`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.status != "fail") {
    //       // history.push(`/battle/${result.id}`);
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_a: {
        photo: img
          ? img
          : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
        like: 0,
        win: false,
      },
      user_aid: User?.id,
      user_bid: OponentID,
      user_b: {
        photo:
          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
        like: 0,
        win: false,
      },
      time: 1,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/battle`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          toast.success("Congratulations 💥💥💥💥", {
            theme: "dark",
          });
          setTimeout(() => {
            history.push(`/battle/${result.data.Battle.id}`);
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [profileImage, setProfileImage] = useState();
  // const [{ alt, src }, setPreview] = useState(initialState);

  useEffect(() => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUsers(result.data.users))
      .catch((error) => console.log("error", error));

    //
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/users/${userDetail}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUser(result.data.user))
      .catch((error) => console.log("error", error));
  }, []);

  //
  const initialState = {
    alt: "",
    src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
  };
  const [{ alt, src }, setPreview] = useState(initialState);
  const [btnStatus, setBtnStatus] = useState(false);
  const [profileData, setProfileData] = useState();

  if (profileData === undefined) {
    setTimeout(() => {
      setProfileData(userDetail?.photo);
    }, 1000);
  }

  const profileImgLink = "";
  useMemo(() => {
    setProfileData(profileImgLink);
    setBtnStatus(false);
  }, [profileImgLink]);

  const uploadProfileHandle = (event) => {
    setProfileImage(event.target.files[0]);
  };
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("image", profileImage);

    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/image`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          setImg(result.data.images.image);
        }
      })
      .catch((error) => console.log("error", error));
  }, [profileImage]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="col-sm-5 mx-auto">
          <div className="card  p-5">
            <h2 className="text-center mb-3">Select Contestants</h2>
            <form className="text-start">
              <div className="profile-input">
                <img
                  className="preview"
                  style={{ objectFit: "cover" }}
                  src={
                    img == "undefined"
                      ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      : img
                  }
                  alt={alt}
                />
                <input
                  className="hide_file"
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    uploadProfileHandle(event);
                    setBtnStatus(true);
                  }}
                />
                <div className="hint">Choose Your Photo</div>
              </div>
              <div class="mb-3 text-start">
                <label for="exampleInputPassword1" class="form-label">
                  Select Opponents
                </label>
                {/* <input
                  type="password"
                  class="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                /> */}
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setOponentID(e.target.value);
                  }}
                >
                  <option selected>Open this select menu</option>
                  {Users
                    ? Users?.map((i) => {
                        return (
                          <option value={i._id}>
                            {i.firstName} {i.lastName}
                          </option>
                        );
                      })
                    : ""}
                </select>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChooseBattle;
