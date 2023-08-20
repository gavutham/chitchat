import "../style.scss";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase.js";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (file) {
        const extension = file.name.split(".")[1];
        const storageRef = ref(storage, `${displayName}.${extension}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error(error);
            setErr(true);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                setLoading(false);
                navigate("/");
              }
            );
          }
        );
      } else {
        await updateProfile(res.user, {
          displayName,
          photoURL:
            "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL:
            "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});
        setLoading(false);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chit Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="profileimg" />
          <label htmlFor="profileimg">
            <img src={Add} alt="add-img" />
            Add a profile image
          </label>
          <button disabled={loading}>Sign Up</button>
          {loading && (
            <span style={{ color: "green", fontSize: 12 }}>
              Signing up, Please wait...
            </span>
          )}
          {err && (
            <span style={{ color: "red", fontSize: 12 }}>
              Something went wrong
            </span>
          )}
        </form>
        <p>
          Existing User? Try <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
