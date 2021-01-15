import React, { useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./Authenticate.css";

const Authenticate = (props) => {
  const { user } = useAuth0();
  const { postNewErrorLog } = useErrorLog();
  const [email, setEmail] = useState(user.email);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { setAuthUser, setAuthToken } = useAuthUser();
  const { sendLoginInfo } = useActivityLog();
  const salt = user.sub.split("|")[1];

  const attempts = useCallback(() => {
    setLoginAttempts(loginAttempts + 1);
  }, [loginAttempts]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const csrfCookie = getCookie("csrftoken");

    const userCredentials = {
      email: email,
      password: salt,
      id_token: sessionStorage.getItem("IdToken"),
      uid: user.sub,
      provider: "auth0",
      csrf_token: csrfCookie,
      extra_data: user,
    };
    try {
      const login = await userManager.login(userCredentials);
      if (login.valid === true) {
        setAuthUser(login);
        setAuthToken(login.QuantumToken);

        // Calling function that sets the token in session storage, and sets isLogged in to true.
        props.setDjangoToken(login);
        sessionStorage.setItem("sessionId", login.session);

        var loginData = {
          user_id: login.id,
          email: login.email,
          browser: props.browserData,
          recent_attempts: loginAttempts,
          version: props.userAgentData,
          platform: props.platformOS,
          app_code_name: props.appCodeNameData,
          id_token: login.management_user,
        };

        try {
          await sendLoginInfo(loginData);
          props.history.push("/home");
          // const origin = window.location.origin;
          // window.location.href = origin + "/home";
        } catch (err) {
          console.log({ err });
          await postNewErrorLog(err, "Authenticate.js", "sendLoginInfo");
        }
      } else {
        alert("Invalid email");
      }
    } catch (err) {
      await postNewErrorLog(err, "Authenticate.js", "loginSubmit");
    }
  };

  function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
        console.log("c", cookie);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  return (
    <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
      <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
          <header className="modal__header">
            <h2 className="modal__title" id="modal-1-title">
              Confirm Email To Login
            </h2>
            <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <main className="modal__content" id="modal-1-content">
            <form className="new_form" id="modal" onSubmit={loginSubmit}>
              <div className="fieldset_container">
                <fieldset className="new_form" id="modal">
                  <label className="new_form_modal" htmlFor="email">
                    <div className="type_modal_label">Email: </div>
                  </label>
                  <input
                    required
                    className="new_form"
                    id="email"
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
              </div>
              <footer className="modal__footer">
                <button id="modal__btn-primary" type="submit" style={{ marginRight: "8px" }} onClick={attempts}>
                  Confirm
                </button>
              </footer>
            </form>

            <div className="signature">
              <p>
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
