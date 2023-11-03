import React, { useState } from "react";
import "./Auth.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../App";
import { baseUrl } from "../..";
function Auth() {
  const [authSection, setAuthSection] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeSection = () => {
    setAuthSection(!authSection);
    setEmail("");
    setName("");
    setPassword("");
  };
  //https://kingdev-0  01-site1.btempurl.com/
  const handleRegister = async (e) => {
    e.preventDefault();
    if (handleValidation("register")) {
      return;
    }
    await axios
      .post(`${baseUrl}/User/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data));
        window.location.reload();
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      return;
    }
    console.log(handleValidation());
    await axios
      .post(`${baseUrl}/User/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data));
        window.location.reload();
      })
      .catch((err) => {
        if (err?.response?.data) {
          toast.error(err.response.data, toastOptions);
        }
        console.log(err.response.data);
      });
  };

  const handleValidation = (type) => {
    const emailRegex =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (type === "register" && !name) {
      toast.error("Name field is required!", toastOptions);
      return true;
    }
    if (!email) {
      toast.error("Email field is required!", toastOptions);
      return true;
    }
    if (!password) {
      toast.error("Password field is required!", toastOptions);
      return true;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is not correct!", toastOptions);
      return true;
    }
  };
  return (
    <div className="auth-page">
      <section>
        <div className="main-form-container">
          <div
            id="form_section"
            className={` form-container ${authSection ? "left-right" : ""}`}
          >
            <div className="login-form form-wraper ">
              <div>
                <div className="form-title">
                  <h2>Login</h2>
                </div>
                <div className="input-group">
                  <div className="box">
                    <span>
                      <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="myInput"
                        type="email"
                      />
                    </span>
                  </div>
                </div>
                <div className="input-group">
                  <div className="box">
                    <span>
                      <input
                        placeholder="Password"
                        className="myInput"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                  </div>
                </div>

                <div className="action-button">
                  <button onClick={handleLogin}>Login</button>
                </div>
              </div>
            </div>
            <div className="signUp-form form-wraper">
              <div>
                <div className="form-title">
                  <h2>Sign Up</h2>
                </div>
                <div className="input-group">
                  <div className="box ">
                    <span>
                      <input
                        placeholder="Name"
                        className="myInput "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                      />
                    </span>
                  </div>
                </div>
                <div className="input-group">
                  <div className="box">
                    <span>
                      <input
                        placeholder="Email"
                        className="myInput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                  </div>
                </div>
                <div style={{ marginBottom: " 0px" }} className="input-group">
                  <div className="box">
                    <span>
                      <input
                        placeholder="Password"
                        className="myInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                  </div>
                </div>
                <div className="action-button">
                  <button onClick={handleRegister}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
          <div id="multiple-btn" className="bg-btn-container">
            <div className="action-button">
              <button onClick={handleChangeSection}>Login</button>
            </div>
            <div className="action-button">
              <button onClick={handleChangeSection}>Sign Up</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Auth;
