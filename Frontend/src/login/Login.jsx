import React from "react";
// import Loading from "../common/loading.jsx";
// import useAxios from "axios-hooks";

// import { observer } from 'mobx-react'
// import useStore from "../store/useStore.jsx";
import axios from "axios";

//const Login = observer(() => {
const Login = () => {
  // const stores = useStore();
  // const [{ data, loading, error }] = useAxios("http://localhost:8081/login");

  // if (loading) return <Loading />;
  // if (error) return <p>Error</p>;

  const getTest = () => {
    axios
      .get("http://localhost:8081/google/userInfo", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
      });
  };

  const postTest = () => {
    axios
      .post(
        "http://localhost:8081/test",
        { data: "post" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <a href="http://localhost:8081/google/login">로그인</a>
      <br />
      <button onClick={getTest}>axios_GET</button>
      <br />
      <button onClick={postTest}>axios_POST</button>
      <br />
      <a href="http://192.168.8.134:8081/test">a_GET</a>
      <br />
      <form id="myfrom" method="get" action="http://192.168.8.134:8081/test">
        <input type="submit" value="form_GET" />
      </form>
      <br />
      <form id="myfrom" method="post" action="http://192.168.8.134:8081/test">
        <input type="submit" value="form_POST" />
      </form>
    </div>

    /* Passport 안쓰고 쌩으로 하는 방법 */
    // <a
    //   href={
    //     "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=" +
    //     data.clientID +
    //     "&redirect_uri=" +
    //     data.redirectURI +
    //     "&scope=email" +
    //     "&response_type=code" +
    //     "&access_type=offline" +
    //     "&flowName=GeneralOAuthFlow"
    //   }
    // >
    //   login
    // </a>
  );
};

export default Login;
