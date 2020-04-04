import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileCard from "../../components/profile/ProfileCard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
// getByRole,
// getByTestId
// only need to mock things in props actually on object.
// since pure functional component, only need to mock the inputs, in which the inputs are props.

test("renders the rollerCoaster credit card with edit, delete button and the details.", () => {
  const history = createMemoryHistory();
  const props = {
    rollerCoaster: {
      id: 1,
      name: "coaster",
      max_height: "50",
      max_speed: "50"
    },
    manufacturer: { name: "Intamin", manufacture_url: "www.rcdb.com" },
    park: { name: "six flags" },
    trackType: { name: "Steel" },
    history: [],
    deleteCredit: jest.fn()
  };

  const profileCard = render(
    <Router history={history}>
      <ProfileCard {...props} />
    </Router>
  );

  // console.log(profileCard.debug());
  const parkNameTag = profileCard.getByText(/Home Park: six flags/i);
  const coasterNameTag = profileCard.getByText(/coaster/i);
  const manufactureNameTag = profileCard.getByText(/Manufactured By: Intamin/i);
  const trackTypeNameTag = profileCard.getByText(/Track Type: Steel/i);
  const maxSpeedTag = profileCard.getByText(/Max Speed: 50/);
  const maxHeightTag = profileCard.getByText(/Max Height: 50/);

  expect(parkNameTag).toBeInTheDocument();
  expect(coasterNameTag).toBeInTheDocument();
  expect(manufactureNameTag).toBeInTheDocument();
  expect(trackTypeNameTag).toBeInTheDocument();
  expect(maxSpeedTag).toBeInTheDocument();
  expect(maxHeightTag).toBeInTheDocument();

  fireEvent.click(profileCard.getByTestId("delete-credit-btn"));
  expect(props.deleteCredit).toHaveBeenCalledTimes(1);
});
