import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "../../components/home/Home";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useAuth0 } from "../../contexts/react-auth0-context";
// import { mount } from "enzyme";

test("renders Home component, banner when user does not have profile, nav bar when user does have profile", () => {
  const history = createMemoryHistory();
  const props = {
    userProfile: {
      name: "matt",
      email: "matt@matt.com",
      picUrl: "picture"
    }
  };
    const user = {
      name: "matt",
      picture: "pic from google",
      email: "matt@mock.com",
      nickname: "bro",
      email_verified: true,
      sub: "google-oauth2|2147627834623744883746"
    };
  const homeComponent = render(
    <Router history={history}>
      <Home {...props} />
    </Router>
  );

  console.log(homeComponent.debug());

  const homeNameTag = homeComponent.getByText(/matt/i);
  const profileEmailTag = homeComponent.getByText(/matt@matt.com/i);
  const picUrlTag = homeComponent.getByTestId("home-profile-pic-testid");

  expect(homeNameTag).toBeInTheDocument();
  expect(profileEmailTag).toBeInTheDocument();
  expect(picUrlTag).toBeInTheDocument();
});

/************* *********************/

const user = {
  name: "matt",
  picture: "pic from google",
  email: "matt@mock.com",
  nickname: "bro",
  email_verified: true,
  sub: "google-oauth2|2147627834623744883746"
};

jest.mock("../../contexts/react-auth0-context");

describe("components/Home - logged in", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      loading: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("Renders with correct link in the menu and required props", async () => {
    //   const wrapper = mount(<Home history={history} {...props} />);

    const homeComponent = render(
      <Router>
        <Home />
      </Router>
    );

    console.log(homeComponent.debug());
    expect(homeComponent).toBeTruthy();
    expect(homeComponent.find("button")).toHaveLength(1);

    // the button should be the "Log out" one since the use is logged in
    expect(homeComponent.find("button").text()).toEqual("Logout");
  });
});


// testing the opposite, if user logged out, show login button.
describe("components/Home - logged out", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("Renders with correct link in the menu", async () => {
    const wrapper = render(
      <Router>
        <Home />
      </Router>
    );
    expect(wrapper).toBeFalsy();
    expect(wrapper.find("button").text()).toEqual("Login");
  });
});
