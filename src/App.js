import { useState } from "react";
import "./App.scss";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Liderboard from "./Layout/Game/Liderboard";
import CheckGame from "./Layout/Game/CheckGame";
import StartGame from "./Layout/Game/StartGame";
import Auth from "./Layout/Auth/Auth";
import NotFoundPage from "./Components/NotFoundPage";
import Profile from "./Layout/Profile/Profile";
function App() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let data = JSON.parse(localStorage.getItem("game"));

  return (
    <>
      {userData ? (
        <>
          <div className="main-page">
            <Navbar />
            <main>
              <Routes>
                <Route element={<CheckGame />} path="/check" />
                <Route element={<StartGame />} path="/" />
                <Route element={<Liderboard />} path="/liderboard" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<NotFoundPage />} path="*" />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <>
          <div className="non-auth">
            <Routes>
              <Route element={<Auth />} path="/" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
}

export default App;

export const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
