import React from "react";
import { createStore } from "redux";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import {
  cleanup,
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../utils/app-test-utils";
import App from "../App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import LandingPage from "../components/LandingPage";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { createMemoryHistory, createBrowserHistory } from "history";
import { Router } from "react-router";
import { signup } from "../actions/Signup";
afterEach(cleanup);

describe('App', () => {

test("renders landing page with default path /", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LandingPage />
    </Router>
  );
  expect(history.location.pathname).toBe("/");
});

// test("redirects to login page", async () => {
//   const history = createMemoryHistory();
//   const { getByTestId } = render(
//     <Router history={history}>
//       <LandingPage />
//     </Router>
//   );

//   // Interact with page
//   act(() => {
//     // Find the link (perhaps using the text content)
//     let goSignup = screen.getByTestId("signup");
//     //Click it
//     //goSignup.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     // fireEvent(goSignup),new MouseEvent('click', {
//     //   bubbles: true,
//     //   cancelable:true
//     // })
//     // fireEvent.click(getByTestId('signup'))
//   });

//   // await wait(() => {
//   //   userEvent.click(getByTestId('login'));
//   // });

//   // Check correct page content showed up
//   // await expect(document.body.textContent).toContain('Email');
// });

test("Title of Landing Page renders", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LandingPage />
    </Router>
  );

  //Check correct page content showed up
  expect(document.body.textContent).toContain("SignLingo");
});

//  test("renders SignLingo", () => {

//   const { getByText } = render(<LandingPage />);
//   const linkElement = getByText(/Signlingo/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('...', () => {
//   const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

//   const wrapper = mount(
//     <Router history={historyMock}>
//       <LandingPage />
//     </Router>,
//   ).find('.selector').at(1);

//   const { onClick } = wrapper.props();
//   act(() => {
//     onClick();
//   });

//   expect(historyMock.push.mock.calls[0][0]).toEqual('/whatever');
//});

it("clicking signup button on Landing Page sends user to SignUp Tab of accounts", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );


   // Interact with page
   act(() => {
    // Find the link (perhaps using the text content)
    const goSignUp = getByTestId('signupLP');
    // Click it
    goSignUp.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
//   getByTestId('signupLP');
//   fireEvent.click(getByTestId("signupLP"));

//   const signupPage = await waitFor(() => getByTestId('confirmSignUp')
//     // fireEvent.click(getByTestId("signupLP"));
// );
  expect(document.body.textContent).toContain("Join using social media");
  
  
});
})

it("clicking backArrow Button on Account Page sends user to Landing Page", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );


   // Interact with page
   act(() => {
    // Find the link (perhaps using the text content)
    const goLandingPage = getByTestId('backLandingPage');
    // Click it
    goLandingPage.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
//   getByTestId('signupLP');
//   fireEvent.click(getByTestId("signupLP"));

//   const signupPage = await waitFor(() => getByTestId('confirmSignUp')
//     // fireEvent.click(getByTestId("signupLP"));
// );
  expect(document.body.textContent).toContain("SignLingo");
  
  
});

it("clicking login button on Landing Page sends user to Login Tab of accounts", async () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );

   // Interact with page
   act(() => {
    // Find the link (perhaps using the text content)
    const goLogin = getByTestId('loginLP');
    // Click it
    goLogin.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
//   getByTestId('signupLP');
//   fireEvent.click(getByTestId("signupLP"));

//   const signupPage = await waitFor(() => getByTestId('confirmSignUp')
//     // fireEvent.click(getByTestId("signupLP"));
// );
  expect(document.body.textContent).toContain("Log in using social media");
  
  
});

