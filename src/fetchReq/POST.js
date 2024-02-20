const PostReq = async ({ data, setPostResponse, setError, endpoint }) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_DOMAIN_ADDRESS + "/v1/" + endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const body = await response.json();
    if (body.success) {
      setError(false);
      setPostResponse(body);
    } else {
      setError(true);
    }
  } catch (error) {
    console.log("There was an issue with POST req: ", error);
  }
};
export default PostReq;
