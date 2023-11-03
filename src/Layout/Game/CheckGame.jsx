import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";
import "./Game.scss";
import { confirmAlert } from "react-confirm-alert";
import LastHistory from "./LastHistory";
import { baseUrl } from "../..";
function CheckGame() {
  let user = JSON.parse(localStorage.getItem("userData"));
  let data = JSON.parse(localStorage.getItem("game"));
  const [message, setMessage] = useState([]);
  const [histories, sethistories] = useState([]);
  const [values, setValues] = useState(Array(4).fill(""));
  let initialState = {
    input1: {
      value: "",
      isValid: false,
    },
    input2: {
      value: "",
      isValid: false,
    },
    input3: {
      value: "",
      isValid: false,
    },
    input4: {
      value: "",
      isValid: false,
    },
  };
  const [form, setForm] = useState(initialState);

  const validateInput = (input) => {
    // Check if the input is empty
    if (input === "" || input < 0) {
      return false;
    }
    // The input is valid
    return true;
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (!/^[0-9]*$/.test(inputValue)) {
      return toast.error("The input must be only numbers", toastOptions);
    }
    if (inputValue > 9) {
      return toast.error("The input must be less than 9", toastOptions);
    }

    // Validate the input
    const isValidInput = validateInput(inputValue);

    // Update the form state with the validation result
    setForm({
      ...form,
      [inputName]: {
        value: inputValue,
        isValid: isValidInput,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the form is valid
    if (
      form.input1.isValid &&
      form.input2.isValid &&
      form.input3.isValid &&
      form.input4.isValid
    ) {
      // Create the string to send to the backend
      const string = `${form.input1.value}${form.input2.value}${form.input3.value}${form.input4.value}`;
      console.log(string);
      checkGame(string);
    } else {
      toast.error("input cannot be empty", toastOptions);
    }
  };

  const handleClickConfirm = () => {
    confirmAlert({
      title: "Confirm to Start new Game",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
        {
          label: "Yes",
          onClick: () => startGame(),
        },
      ],
    });
  };

  const checkGame = async (clientNumber) => {
    await axios
      .post(`${baseUrl}/Game/check`, {
        clientNumber,
        gameId: data.gameId,
        userId: user.id,
      })
      .then((res) => {
        setMessage(res.data);
        sethistories(res.data.histories);
        setForm(initialState);
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };

  const startGame = async (e) => {
    await axios
      .get(`${baseUrl}/Game/start`)
      .then((res) => {
        localStorage.setItem("game", JSON.stringify(res.data));
        toast.success("The new Game started successfully", toastOptions);
        setMessage("Now you started new game");
        sethistories("");
        setForm(initialState);
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };

  return (
    <div>
      <div className="guessing-game">
        <h1 className="title">Guessing Game</h1>

        <div className="inputs">
          <input
            type="text"
            name="input1"
            value={form.input1.value}
            onChange={handleChange}
          />
          <input
            type="text"
            name="input2"
            value={form.input2.value}
            onChange={handleChange}
          />
          <input
            type="text"
            name="input3"
            value={form.input3.value}
            onChange={handleChange}
          />
          <input
            type="text"
            name="input4"
            value={form.input4.value}
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button className="check-button" onClick={handleSubmit}>
            Check
          </button>
          <button className="start-button" onClick={handleClickConfirm}>
            Start New Game
          </button>
        </div>
        <h2 className="message">{message?.lastGame?.message}</h2>
      </div>
      {histories?.length > 0 ? <LastHistory data={histories} /> : ""}
    </div>
  );
}

export default CheckGame;
