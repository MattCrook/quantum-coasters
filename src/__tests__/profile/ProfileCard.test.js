import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "../../components/profile/ProfileCard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";



test("renders the rollerCoaster credit card with edit, delete button and the details.", () => {
    const history = createMemoryHistory();
    const props = {
        userProfile: {id: 1, first_name: "matt", last_name: "crook", username: "mgcrook", email: "mattcrook@matt.com", address: "123 rollercoaster lane", credits: [{rollerCoasterId: 1}], picUrl: ""},
        rollerCoaster: {id: 1, name: "coaster", trackTypeId: 1, max_height: "50", max_speed: "50", parkId: 1, manufacturerId: 2},
        manufacturer: {id: 1, name: "Intamin", origin_country: "Germany", manufacture_url: "www.rcdb.com" },
        user: {nickname: "matt", name: "matt@matt.com", picture: "https://s.gravatar.com/avatar/d3218fb15b534b98e081379092d1c3bd?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmo.png", updated_at: "2020-03-30T23:14:50.661Z", email: "matt@matt.com", email_verified: false, sub: "auth0|5e827d6a0f549b0be3d4c94a"},
        park: {id: 1, name: "six flags", parkLocation: "Georgia", parkCountry: "USA"},
        trackType: {id: 1, name: "Steel"},
        history: [],
        deleteCredit: () => {},
        editCredit: () => {}
    };

    // const profileCardObject = {
    //     name: "coaster",
    //     parkName: "six flags",
    //     manufactureName: "Intamin",
    //     max_speed: "50",
    //     max_height: "50",
    //     trackType: "steel"
    // };

    const profileCard = render(
        <Router history={history}>
            <ProfileCard {...props} />
        </Router>
    );

    const parkNameTag = profileCard.getByText(/Home Park: six flags/i);
    const coasterNameTag = profileCard.getByText(/coaster/i);
    const manufactureNameTag = profileCard.getByText(/Manufactured By: Intamin/i);
    const trackTypeNameTag = profileCard.getByText(/Track Type: Steel/i);
    const maxSpeedTag = profileCard.getByText(/Max Speed: 50/)
    const maxHeightTag = profileCard.getByText(/Max Height: 50/);


    expect(parkNameTag).toBeInDocument();
    expect(coasterNameTag).toBeInDocument();
    expect(manufactureNameTag).toBeInDocument();
    expect(trackTypeNameTag).toBeInDocument();
    expect(maxSpeedTag).toBeInDocument();
    expect(maxHeightTag).toBeInDocument();

    // console.log(profileCard.debug());
});
