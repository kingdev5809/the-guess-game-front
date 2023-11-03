import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { toastOptions } from "../../App";
import { toast } from "react-toastify";
import { baseUrl } from "../..";
function Profile() {
  const [visiblePass, setVisiblePass] = useState(false);
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setName(userData.name);
    setPassword(userData.password);
  }, []);
  const handleUpdate = async (e) => {
    if (name === userData.name && password === userData.password) {
      toast.error("First change some  ", toastOptions);
      return;
    }
    await axios
      .post(`${baseUrl}/User/edit`, {
        name,
        password,
        id: userData.id,
        email: userData.email,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data));
        userData = res.data;
        toast.success("The User updated successfuly", toastOptions);
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="inputs">
        <div className="input-box">
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="input-box">
          <label>Password:</label>
          <div className="pass">
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setVisiblePass(!visiblePass)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-eye"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}

export default Profile;
