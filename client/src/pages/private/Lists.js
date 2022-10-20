import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
import List from "../../components/List";

import axios from "../../helpers/axios";

export default () => {
  const navigate = useNavigate();
  const user = useContext(UserContext).userData;
  const [data, setData] = useState();

  useEffect(() => {
    if (!user || !user.username || !user._id || !user.token) {
      navigate("/login");
    }
    user &&
      user._id &&
      axios
        .get("/user/private-data/" + user._id)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message || err.message);
        });
  }, [user._id]);

  return (
    <div className="container">
      <h1>LISTS OF {user && user.username}</h1>
      <pre>{JSON.stringify(data)}</pre>
      <div className=" d-flex justify-content-between flex-wrap">
        <div className="p-1 col-md-4">
          <List />
        </div>
      </div>
    </div>
  );
};
