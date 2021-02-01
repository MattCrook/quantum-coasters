import React, { useState, useRef } from "react";
import newsManager from "../../modules/news/newsManager";
import { confirmAlert } from "react-confirm-alert";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import NavHeader from "../nav/NavHeader";
import "./BlogContributorForm.css";

const BlogContributorForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { postNewErrorLog } = useErrorLog();
  const { postActivityLogSubmitNewsApplication } = useActivityLog();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const website = useRef();
  const socialMedia = useRef();
  const shortDescription = useRef();
  const { authUser } = props;

  const handleFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    var event = e;
    confirmAlert({
      title: "Application Submitted!",
      message: "Thanks for showing interest in becoming a Quantum Contributor.",
      buttons: [
        {
          label: "Ok",
          onClick: async () => {
            const data = {
              user_id: authUser.id,
              firstName: firstName.current.value,
              lastName: lastName.current.value,
              email: email.current.value,
              socialMedia: socialMedia.current.value,
              shortDescription: shortDescription.current.value,
            };
            try {
              //   const sendVerificationEmail = await postEmailVerify();
              await newsManager.postUserBlogApplication(data);
              await postActivityLogSubmitNewsApplication(event, authUser.id);
              setIsLoading(false);
              props.history.push("/news");
            } catch (err) {
              console.log({ "Application POST Error": err });
              await postNewErrorLog(err, "BlogContributorForm,js", "handleFormSubmit");
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
      closeOnClickOutside: true,
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    });
  };

  return (
    <>
      <NavHeader {...props} />
      <form className="blog_apply_form" onSubmit={handleFormSubmit}>
        <fieldset className="fs-apply-form">
          <h3 className="apply-title">Become a Quantum Contributor</h3>
          <div className="apply-for-blog-form">
            <label className="apply_form_label" htmlFor="first_name">
              First Name
            </label>
            <input className="input_apply" ref={firstName} type="text" id="first_name" required />

            <label className="apply_form_label" htmlFor="last_name">
              Last Name
            </label>
            <input className="input_apply" ref={lastName} type="text" id="last_name" required />
            <label id="apply_email_label" className="apply_form_label" htmlFor="applyEmail">
              Email
            </label>
            <input className="input_apply" ref={email} type="text" id="applyEmail" required />

            <label id="apply_website_label" className="apply_form_label" htmlFor="website">
              Website/ Personal Blog
            </label>
            <input
              className="input_apply"
              ref={website}
              type="text"
              id="website"
              placeholder="Please include link to website, personal blog, if you have one."
            />

            <label id="register_form_social_label" className="apply_form_label" htmlFor="social_media">
              Social Media
            </label>
            <input
              className="input_apply"
              ref={socialMedia}
              type="text"
              id="social_media"
              placeholder="Include link to at least one social media account. (*Optional)"
            />
            <label id="apply_form_final_words_label" className="apply_form_label" htmlFor="short_description">
              Final Words
            </label>
            <textarea
              className="input_apply"
              ref={shortDescription}
              type="message"
              id="short_description"
              placeholder="Short description why you'd like to become a contributor."
            />

            <button className="apply-create-btn" type="submit" disabled={isLoading}>
              Finish
            </button>
          </div>
        </fieldset>
      </form>
      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default BlogContributorForm;
