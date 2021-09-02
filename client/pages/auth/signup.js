import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
  });

  // Handle sign up submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};
