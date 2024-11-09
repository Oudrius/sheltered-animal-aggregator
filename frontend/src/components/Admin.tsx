import { useState, useEffect } from "react";
import API_ROUTES from "../config/api";
import { useNavigate } from "react-router-dom";
import AddAnimalForm from "./AddAnimalForm";
import { Box, Center, Text } from "@chakra-ui/react";
import Logout from "./Logout";

interface UserResponse {
  username: string;
  detail: string;
}

function Admin() {
  const [user, setUser] = useState<string>();
  const [showAddForm, setShowAddForm] = useState(true);
  const navigate = useNavigate();
  const [xcsrf, setXcsrf] = useState<string>();

  useEffect(() => {

    const setCookies = async () => {

      const url = API_ROUTES.Csrf;
    
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
    
      const json = await response.json();

      const xcsrftoken = response.headers.get('X-CSRFToken');
      if (xcsrftoken) {
        setXcsrf(xcsrftoken);
      }

    }
    setCookies();
  }, [])

  useEffect(() => {

    const getUser = async () => {
      try {
        const url = API_ROUTES.User;
        const response = await fetch(url, {
          credentials: 'include',
        });
        const json: UserResponse = await response.json();

        if (!response.ok) {
          navigate('/login')
          throw new Error(`Status: ${response.status} ${json.detail}`);
        }
        else {
          setUser(json.username);
        }
      }

      catch (e) {
        console.error('Not logged in.', e);
      }
    }
    getUser();
  }, []);

  return (
    <Box>
      {user && showAddForm &&
      <>
      <h1>Logged in as: {user}</h1>
        <Logout xcsrf={xcsrf? xcsrf: ''}/>
        <AddAnimalForm xcsrf={xcsrf? xcsrf: ''}/>
      </>
      }
    </Box>
  )
}

export default Admin;