import React from "react";
import { toastOptions } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Game.scss";
import { baseUrl } from "../..";
function StartGame() {
  const navigate = useNavigate();
  const handleStartGame = async (e) => {
    e.preventDefault();
    await axios
      .get(`${baseUrl}/Game/start`)
      .then((res) => {
        localStorage.setItem("game", JSON.stringify(res.data));
        navigate("/check");
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        if (err?.message) {
          toast.error(err.message, toastOptions);
        }
        console.log(err);
      });
  };
  return (
    <>
      <div className="start-game">
        <div className="inner">
          <h1>Welcome to the Guessing game</h1>

          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </div>
    </>
  );
}

export default StartGame;
