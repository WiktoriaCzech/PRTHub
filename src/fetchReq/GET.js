const GetReq = async ({ setResponse, endpoint }) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_DOMAIN_ADDRESS + "/v1/" + endpoint,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_DOMAIN_ADDRESS,
          // "Authorization" : `Bearer ${localStorage.token}`,
        },
      }
    );

    const body = await response.json();
    setResponse(body);
  } catch (error) {
    console.log("There was an issue with GET req: ", error);
  }
};
export default GetReq;
