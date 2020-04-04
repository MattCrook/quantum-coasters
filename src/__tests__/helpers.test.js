import { isEditCheck, handleFieldChangeHelper } from "../modules/helpers";

test("does edit button show only for currently logged in user", () => {
  const props = {
    userProfile: {
      id: 1
    },
    messageToEdit: {
      id: 2,
      text: "message that i want to edit.",
      userId: 1,
      timestamp: "time of first message sent"
    },
    setMessageToEdit: jest.fn()
  };
  const messageToPost = {
    id: 2,
    userId: 1,
    message: "testing showing the edit button",
    timestamp: "some arbitrary new later time"
  };

  expect(isEditCheck(props, messageToPost)).toEqual({
    id: 2,
    userId: 1,
    message: "testing showing the edit button",
    timestamp: "time of first message sent"
  });
});

test("handleFieldChangeHelper correctly watches and changes state of input fields", () => {

  const currentStateMock = {};
  const setCurrentStateMock = jest.fn();
  const eventMock = { target: { id: 1, value: "anything" } };

  const mockInvokeOfFunction = handleFieldChangeHelper(currentStateMock, setCurrentStateMock);

  mockInvokeOfFunction(eventMock);

  expect(setCurrentStateMock).toHaveBeenCalledTimes(1);
  expect(setCurrentStateMock).toHaveBeenCalledWith({1: "anything"});

});
