import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  console.log("I am in the currentUser", currentUser);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

// This part gets executed in the server side render
// There is a case where it gets executed on the browser side as well when there is a page navigation
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
