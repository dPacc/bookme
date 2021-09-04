import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("I am in the component", currentUser);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

// This part gets executed in the server side render
// There is a case where it gets executed on the browser side as well when there is a page navigation
LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // We are on the server
    // Requests should be made to http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "bookme.dev",
        },
      }
    );
    return data;
  } else {
    // We are on the browser
    // Requests can be made with a base URL of ''
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
};

export default LandingPage;
