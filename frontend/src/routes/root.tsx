import App from "../App";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <App />
          <Outlet />
      </>
    );
  }
  