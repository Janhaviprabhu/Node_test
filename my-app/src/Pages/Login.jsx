import { useState } from "react";
import axios  from "axios";


export default function Login() {
  

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  //console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:8080/login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form action="">
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
        <input onSubmit={handleSubmit} type="submit"  value={'submit'}/>
      </form>
    </>
  );
}
