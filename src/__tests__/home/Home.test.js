import React from "react";
import { render } from "@testing-library/react";
import Home from "../../components/home/Home";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useAuth0 } from "../../contexts/react-auth0-context";

const history = createMemoryHistory();

jest.mock("../../contexts/react-auth0-context");

describe("components/Home - logged in", () => {
  const props = {
    userProfile: {
      email: "matt@matt.com",
      picUrl: "picture"
    }
  };

  const user = {
    name: "matt",
    picture: "pic from google",
    email: "matt@mock.com",
    nickname: "bro"
  };

  // Mock the Auth0 hook and make it return a logged in state
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user,
      loading: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("Renders with correct link in the menu and required props", async () => {
    const homeComponent = render(
      <Router history={history}>
        <Home {...props} />
      </Router>
    );

    // console.log(homeComponent.debug());

    const logoutBtnTag = homeComponent.getByTestId("logout-btn-testid");
    const homeNameTag = homeComponent.getByText(/matt/i);
    const picUrlTag = homeComponent.getByTestId("home-profile-pic-testid");

    // The button should be the "Log out" one since the use is logged in
    expect(homeComponent).toBeTruthy();
    expect(logoutBtnTag).toBeInTheDocument();
    expect(homeNameTag).toBeInTheDocument();
    expect(picUrlTag).toBeInTheDocument();

  });

});

// testing the opposite, if user logged in, no profile, show banner:
describe("components/Home - No Profile", () => {
  const props = {
    userProfile: {
      email: "",
      picUrl: ""
    }
  };

  const user = {
    name: "matt",
    picture: "pic from google",
    email: "matt@mock.com",
    nickname: "bro"
  };

  jest.mock("../../contexts/react-auth0-context");

  beforeEach(() => {
    useAuth0.mockReturnValue({
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("Renders with banner on home page and complete profile button", async () => {
    const homeComponent = render(
      <Router history={history}>
        <Home {...props} />
      </Router>
    );

    const completeProfileBtnTag = homeComponent.getByTestId("complete-profile-btn-testid");
    const welcomeGreetingTag = homeComponent.getByTestId("welcome-greeting-testid");

    expect(homeComponent).toBeTruthy();
    expect(completeProfileBtnTag).toBeInTheDocument();
    expect(welcomeGreetingTag).toBeInTheDocument();

  });

});
