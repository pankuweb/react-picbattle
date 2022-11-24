import { useEffect, useState, useCallback } from "react";
import "./../App.css";
import dummyProfile from "./../Assets/Images/profile.png";
import { APIURL } from "../Utils/url.js";
import { useParams } from "react-router-dom";

function Home() {
  const [BattleData, setBattleData] = useState();
  const [FirstLike, setFirstLike] = useState();
  const [SecondLike, setSecondLike] = useState();
  const params = useParams();

  const AddLikeA = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      user_a: {
        like: BattleData?.user_a?.like + 1,
      },
      user_b: {
        like: BattleData?.user_b?.like + 0,
      },
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/battle/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getBattleDetail();
      })
      .catch((error) => console.log("error", error));
  };

  const AddLikeB = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      user_a: {
        like: BattleData?.user_a?.like + 0,
      },
      user_b: {
        like: BattleData?.user_b?.like + 1,
      },
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/battle/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getBattleDetail();
      })
      .catch((error) => console.log("error", error));
  };

  const getBattleDetail = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APIURL}/api/v1/battle/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBattleData(result.data.battle))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getBattleDetail();
  }, []);
  // var startTime = new Date();
  // var endTime = BattleData?.createdAt;
  // var difference = endTime?.getTime() - startTime?.getTime(); // This will give difference in milliseconds
  // var resultInMinutes = Math?.round(difference / 60000);-p[[[[[]]]]]

  const startTime = new Date(BattleData?.createdAt);
  const endTime = new Date();
  const diff = endTime.getTime() - startTime.getTime();
  const hrDiff = Math?.round(diff / 60000);

  const test = hrDiff === BattleData?.time ? window.location.reload() : "";
  // const totalHours = parseFloat(hrDiff.toFixed(2)); // 1.5

  const [counter, setCounter] = useState(120);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className="Home mt-5">
      <div className="container">
        <div className="battle-outer">
          <div className="row">
            <h2 className="text-center mb-5">
              {hrDiff > BattleData?.time
                ? BattleData?.user_a?.like > BattleData?.user_b?.like
                  ? "Congratulations you won the battle 💥💥💥💥"
                  : "Opponents won the battle 👎👎👎👎👎👎👎"
                : ""}
            </h2>
          </div>
          <div className="row">
            <div
              className="col-sm-6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="card" style={{ width: "300px" }}>
                <img
                  className="card-img-bottom"
                  src={
                    BattleData?.user_a?.photo == "undefined"
                      ? dummyProfile
                      : BattleData?.user_a?.photo
                  }
                  alt="Card image"
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h4 className="card-title">{`${BattleData?.user_aid?.firstName} ${BattleData?.user_aid?.lastName}`}</h4>
                  <p className="card-text">{BattleData?.user_a?.like}</p>
                  <button
                    disabled={hrDiff > BattleData?.time ? true : false}
                    onClick={() => {
                      AddLikeA();
                    }}
                    className="btn btn-primary"
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-sm-6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="card" style={{ width: "300px" }}>
                <img
                  className="card-img-bottom"
                  src={
                    BattleData?.user_b?.photo == "undefined"
                      ? dummyProfile
                      : BattleData?.user_b?.photo
                  }
                  alt="Card image"
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h4 className="card-title">
                    {`${BattleData?.user_bid?.firstName} ${BattleData?.user_bid?.lastName}`}
                  </h4>
                  <p className="card-text">{BattleData?.user_b?.like}</p>
                  <button
                    disabled={hrDiff > BattleData?.time ? true : false}
                    onClick={() => {
                      AddLikeB();
                    }}
                    className="btn btn-primary"
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
