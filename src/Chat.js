import { useEffect } from "react";

import { sendTracking } from "./utils";

export const Chat = () => {
  useEffect(() => {
    sendTracking(10);
  }, []);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};
