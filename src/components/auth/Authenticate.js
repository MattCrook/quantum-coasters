import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";

export default function Authenticate(props) {
    const { loading, user, loginWithRedirect, clearStorage, isAuthenticated } = useAuth0();
    console.log(props)
    

    return (
        <>
        <div classNameName="modal micromodal-slide" id="modal-1" aria-hidden="true">
            <div classNameName="modal__overlay" tabindex="-1" data-micromodal-close>
                <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                    <header className="modal__header">
                        <h2 className="modal__title" id="modal-1-title">Confirm Email To Login</h2>
                        <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
                    </header>

                    <main className="modal__content" id="modal-1-content">
                        <form className="new_form" id="modal">

                            <div className="fieldset_container">
                                <fieldset className="new_form" id="modal">
                                    <label className="new_form_modal" htmlFor="email"><div className="type_modal_label">Email: </div></label>
                                    <input required className="new_form" id="type" type="text" name="type" value="" />
                                </fieldset>
                            </div>
                            <footer className="modal__footer">
                                    <button id="modal__btn-primary" type="submit" style={{ marginRight: "8px" }}>Confirm</button>
                                <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
                            </footer>
                        </form>
                        <div className="signature">
                            <p>Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-copyright"></i></p>
                        </div>
                    </main>
                </div>
            </div>
            </div>
            </>

    );
};
