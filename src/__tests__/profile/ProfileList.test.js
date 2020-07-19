import React from "react";
import { render } from "@testing-library/react";
import ProfileList from "../../components/profile/ProfileList";
import { Router } from "react-router-dom";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { createMemoryHistory } from "history";
import userManager from "../../modules/users/userManager";
// import { fireEvent, act } from "@testing-library/react";

const history = createMemoryHistory();
jest.mock("../../contexts/react-auth0-context");
jest.mock("../../users/userManager");
/* throws uncaught exception if not mocked properly */

describe("<ProfileList />", () => {
  const props = {
    userProfile: {
      id: 1,
      first_name: "matt",
      last_name: "crook",
      credits: [{ rollerCoasterId: 1 }, { rollerCoasterId: 2 }],
      picUrl: "picture goes here"
    },
    history: []
  };

  const user = {
    picture: "alt picture goes here",
    email: "matt@matt.com"
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      user,
      loading: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

    userManager.getUserProfile.mockReturnValue({
        id: 1,
        first_name: "matt",
        last_name: "crook",
        credits: [{ rollerCoasterId: 1}, {rollerCoasterId: 2}],
        picUrl: "picture goes here"
    })

  it("Renders edit, delete profile buttons/ roller coaster cards", async () => {
    // mock out window.fetch for the test
    const fakeUserProfile = {
      id: 1,
      first_name: "matt",
      last_name: "crook",
      credits: [{ rollerCoasterId: 1 }, { rollerCoasterId: 2 }],
      picUrl: "picture goes here"
    };
    jest.spyOn(userManager, "getUserProfile").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeUserProfile)
      });
    });


    const profileListComponent = render(
      <Router history={history}>
        <ProfileList {...props} />
      </Router>
    );


    let creditsArray = fakeUserProfile.credits;
    expect(fakeUserProfile.credits).toEqual(creditsArray);


    // console.log(profileListComponent.debug());

    expect(profileListComponent).toBeTruthy();

    const profileCardTag = profileListComponent.getByTestId("profile_card_container_testid");
    const deleteBtnTag = profileListComponent.getByTestId("delete_profile_btn_testid");

    expect(profileCardTag).toBeInTheDocument();
    expect(deleteBtnTag).toBeInTheDocument();

    const editBtnTag = profileListComponent.getByTestId("edit_profile_btn_testid");
    expect(editBtnTag).toBeInTheDocument();
  });
});
