import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BE_URL } from "src/consts.tsx";

const Poster = () => {
  const { id } = useParams();
  console.log("Got id:", id);

  useEffect(() => {
    fetch(BE_URL + "/reqpost", {
      method: "POST",
      //credentials: "include",
      body: JSON.stringify({ a: 1, region: "ch" }),
    })
      .then((response) => response.text())
      .then((body) => console.log(body)); // you can use response body here
  }, []);

  return (
    <>
      <div>Poster</div>
    </>
  );
};

export default Poster;
