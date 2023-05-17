import React, {useContext, useState } from 'react';
import "./register.css";

import axios from 'axios';
import { RegisterContext } from '../../context/RegisterContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Register = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    /*const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        country: undefined,
        city: undefined,
        phone: undefined,
        password: undefined,
      });
      */

    const { user, loading, error, dispatch } = useContext(RegisterContext);

    const navigate = useNavigate();

    /*const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: [e.target.value]}))
    }*/

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/duabuksuq/image/upload",
            data
          );
    
          const { url } = uploadRes.data;
    
          const newUser = {
            ...info,
            img: url,
          };
    
          await axios.post("/auth/register", newUser);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      };
    


    /*const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
            navigate("/login")
        } catch (err) {
            console.log(err);
            dispatch({ type: "REGISTER_FAILURE", payload: err.message})
        }
    };*/
    

  return (
    <div className="register">
        <div className="registerContainer">
        <h3 className="welcomeText">Welcome to Hotel Moment!</h3>
        <div className="left">
            <img
              className="profilePreview"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
        <label htmlFor="file">
            Profile Picture: <FontAwesomeIcon icon={faFileArrowUp} />
        </label>
        <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
        />
            <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="rInput"
            />
            <input
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
                className="rInput"
            />
            <input
                type="text"
                placeholder="country"
                id="country"
                onChange={handleChange}
                className="rInput"
            />
            <input
                type="text"
                placeholder="city"
                id="city"
                onChange={handleChange}
                className="rInput"
            />
            <input
                type="text"
                placeholder="phone"
                id="phone"
                onChange={handleChange}
                className="rInput"
            />
            <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="rInput"
            />
            <button disabled={loading} onClick={handleRegister} className="rButton">
                Sign Up
            </button>
            <span className="linkText">Already Signed Up? <Link to="/login">Login</Link></span>

        </div>
    </div>
  )
}

export default Register