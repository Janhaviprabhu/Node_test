import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function Signup() {
    const navigate= useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:8080/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Registered Successfully") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form action="">
        <input
          name="username"
          value={user}
          onChange={handleChange}
          type="text"
          placeholder="enter username"
        />
        <input
          name="email"
          value={user}
          onChange={handleChange}
          type="text"
          placeholder="enter email"
        />
        <input
          name="password"
          value={user}
          onChange={handleChange}
          type="text"
          placeholder="enterpassword"
        />
        <input onSubmit={handleSubmit} type="submit" value={"submit"} />
      </form>
    </>
  );
}
