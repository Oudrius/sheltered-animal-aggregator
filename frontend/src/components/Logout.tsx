import { Button } from "@chakra-ui/react";
import API_ROUTES from "../config/api";
import { useNavigate } from "react-router-dom";

interface XcsrfProps {
  xcsrf: string;
}

function Logout({ xcsrf }: XcsrfProps) {

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const url = API_ROUTES.Logout;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': xcsrf
        },
        method: 'POST',
        credentials: 'include',
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      else {
        navigate('/');
      }
    }

    catch(error) {
      console.error(error);
    }
  }

  return (
    <Button onClick={onLogout}>
      Logout
    </Button>
  )
}

export default Logout;