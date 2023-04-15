export const sendTracking = (eventCode) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventCode }),
  };

  let url = "https://friendy-fe-kkrep.ondigitalocean.app/api/track";

  if (process.env.REACT_APP_STAGE === "dev") {
    url = "http://localhost:8080/track";
  }

  fetch(url, requestOptions).then((response) => {
    if (response.status !== 200) {
      console.log("Something went wrong with tracking");
    }
  });
};
