import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TakeQueue from "../pages/TakeQueue.jsx";
import "../styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TakeQueue />
  </StrictMode>,
);
