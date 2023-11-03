import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";
import { baseUrl } from "../..";

function Liderboard() {
  const [liderboardData, setLiderboardData] = useState([]);
  const [minimumGames, setMinimumGames] = useState(null);
  // 

  const getLiderBoard = async () => {
    await axios
      .get(`${baseUrl}/api/Liderboard`)
      .then((res) => {
        setLiderboardData(res.data);
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };
  const getLiderBoardWithNum = async () => {
    await axios
      .get(`${baseUrl}/api/Liderboard/${minimumGames}`)
      .then((res) => {
        setLiderboardData(res.data);
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };
  useEffect(() => {
    if (minimumGames) {
      getLiderBoardWithNum();
      return;
    }
    getLiderBoard();
  }, [minimumGames]);

  return (
    <div className="liderboard">
      <div className="title">
        <h1>Liderboard </h1>
        <input
          type="number"
          placeholder="Search with minimum games played"
          value={minimumGames}
          onChange={(e) => setMinimumGames(e.target.value)}
        />
      </div>
      <table className="rwd-table">
        <tr>
          <th>User Name</th>
          <th>Games Played</th>
          <th>Games Won</th>
          <th>Total Tries</th>
          <th>Success Rate</th>
        </tr>
        {liderboardData?.map((item) => (
          <tr>
            <td>{item?.user?.name}</td>
            <td>{item.gamesPlayed}</td>
            <td>{item.gamesWon}</td>
            <td>{item.totalTries}</td>
            <td>{item.successRate}</td>
          </tr>
        ))}
        {liderboardData.length === 0 ? <h1>The Games Not found</h1> : ""}
      </table>
    </div>
  );
}

export default Liderboard;
