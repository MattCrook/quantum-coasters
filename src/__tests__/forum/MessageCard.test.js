import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MessageCard from "../../components/messages/MessageCard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders message card wth props, message, and edit button", () => {
  const history = createMemoryHistory();
  const props = {
    message: {
      user: { first_name: "Matt" },
      userId: 1,
      message: "testing the message card.",
      timestamp: "numbers for time"
    },
    userProfile: {
      id: 1
    },
    defaultProfilePicture: "is in the dom",
    setMessageToEdit: jest.fn()
  };
  const messageCard = render(
    <Router history={history}>
      <MessageCard {...props} />
    </Router>
  );

  //   console.log(messageCard.debug());

  const messageTextTag = messageCard.getByText(/testing the message card/i);
  const first_nameTag = messageCard.getByText(/Matt/i);
  const picUrlTag = messageCard.getByAltText(/My Avatar/i);
  const timestampTag = messageCard.getByText(/numbers for time/i);
  const defaultProfilePictureTag = messageCard.getByAltText(/My Avatar/i);
  const editButton = messageCard.getByTestId("edit-testid");

  expect(messageTextTag).toBeInTheDocument();
  expect(first_nameTag).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(picUrlTag).toBeInTheDocument();
  expect(timestampTag).toBeInTheDocument();
  expect(defaultProfilePictureTag).toBeInTheDocument();

  fireEvent.click(messageCard.getByTestId("edit-testid"));
  expect(props.setMessageToEdit).toHaveBeenCalledTimes(1);
});
