import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BE_URL } from "src/consts.tsx";

const Getter = () => {
  const { id } = useParams();
  console.log("Got id:", id);

  useEffect(() => {
    fetch(BE_URL + "/reqget", {
      method: "GET",
      //credentials: "include",
    })
      .then((response) => response.text())
      .then((body) => console.log(body)); // you can use response body here
  }, []);

  return (
    <>
      <div>Getter</div>
    </>
  );
};

export default Getter;
