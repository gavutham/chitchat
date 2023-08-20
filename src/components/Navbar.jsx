import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const user = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chit Chat</span>
      <div className="user">
        <div className="">
          <img src={user.photoURL} alt="profile-img" />
          <span>{user.displayName}</span>
        </div>
        <div className="">
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
