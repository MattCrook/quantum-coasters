import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./Authenticate.css";
import userManager from "../../modules/users/userManager";

export default function Authenticate(props) {
  const { user } = useAuth0();
  const [email, setEmail] = useState(user.email);
  const { setAuthUser } = props;
  const { setAuthToken } = props;
  const { setDjangoToken } = props;
  const password = user.sub.split("|")[1];

  const loginSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password,
    };
    userManager
      .login(userCredentials)
      .then((resp) => {
        setAuthUser(resp);
        setAuthToken(resp.QuantumToken);
        setDjangoToken(resp);
        userManager
          .loginSocialAuth("auth0")
            .then((resp) => {
              console.log(resp)
            props.history.push("/home");
          })
          .catch((err) => console.log({ "Social Auth Error": err }));
      })
      .catch(() => alert("Invalid email"));
  };

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
                <button id="modal__btn-primary" type="submit" style={{ marginRight: "8px" }}>
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
}
