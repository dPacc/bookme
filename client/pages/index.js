import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// This part gets executed in the server side render
// There is a case where it gets executed on the browser side as well when there is a page navigation
LandingPage.getInitialProps = async (context) => {
  console.log("LandingPage.getInitialProps");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
