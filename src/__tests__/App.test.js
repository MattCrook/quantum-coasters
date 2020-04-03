import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { useAuth0 } from "../contexts/react-auth0-context";

jest.mock("../contexts/react-auth0-context.js");

const props = {
  userProfile: {
    email: "matt@matt.com",
    picUrl: "picture"
  }
};

const user = {
  email: "matt@mock.com"
};
describe("component/App", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      user,
      loading: false
    });
  });

  test("Has Auth0 user credentials and renders App.js", async () => {
    const appComponent = render(<App {...props} />);

    expect(appComponent).toBeTruthy();

    // console.log(appComponent.debug());
  });
});
