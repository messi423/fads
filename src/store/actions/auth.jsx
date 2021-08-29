import * as at from "./actionTypes";
import axios from 'axios';

export const authStart = () => {
    console.log("start");
    return {
      type: at.AUTH_START,
    };
  };
  
  export const authSuccess = (user) => {
    console.log(user);
    return {
      type: at.AUTH_SUCCESS,
      user: user,
    };
  };
  
  export const authFail = (error) => {
    console.log(error);
    return {
      type: at.AUTH_FAIL,
      error: error,
    };
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
    //localStorage.removeItem("expirationDate");
    console.log("logged out");
    return {
      type: at.AUTH_LOGOUT,
    };
  };


  export const login = (form) => {
    return (dispatch) => {
      dispatch(authStart());

      axios
      .post("http://127.0.0.1:5000/api/v1/login", {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
          console.log(res);
         const user = {
           token: res.data.token,
           id: res.data.user.id
         }
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(authSuccess(user));
        //dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });

    };
  };
  
//   check signup url *******
export const signup = (form) => {
    return (dispatch) => {

        dispatch(authStart);

    axios
      .post("http://127.0.0.1:5000/api/v1/users", {
        email: form.email,
        password: form.password,
        name: form.name
      })
      .then((res) => {
        console.log(res);
        const user = {
          token: res.data.token,
          id: res.data.user.id
        }
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(authSuccess(user));
        //dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });

    };
  };


  export const checkAuthState = () => {
    return (dispatch) => {
      const user = (localStorage.getItem("user"))? JSON.parse(localStorage.getItem("user")):null;
      if(user){
        dispatch(authSuccess(user));
      }
      else {
        dispatch(logout());
      }
    }
  }

