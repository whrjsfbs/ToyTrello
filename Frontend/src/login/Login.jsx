import React from "react";
// import Loading from "../common/loading.jsx";

// import { observer } from 'mobx-react'
// import useStore from "../store/useStore.jsx";
import axios from "axios";

//const Login = observer(() => {
const Login = () => {
  // const stores = useStore();

  const getTest = () => {
    axios
      // eslint-disable-next-line no-undef
      .get(SERVER_DOMAIN + "/google/userInfo", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <a
        href={
          // eslint-disable-next-line no-undef
          SERVER_DOMAIN + "/google/login"
        }
      >
        로그인
      </a>
      <a
        href={
          // eslint-disable-next-line no-undef
          SERVER_DOMAIN + "/google/logout"
        }
      >
        로그아웃
      </a>
      <br />
      <button onClick={getTest}>axios_GET</button>
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
