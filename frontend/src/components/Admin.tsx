import { useState, useEffect } from "react";
import API_ROUTES from "../config/api";
import { useNavigate } from "react-router-dom";
import AddAnimalForm from "./AddAnimalForm";
import { Box, Center, Text } from "@chakra-ui/react";

interface UserResponse {
  username: string;
  detail: string;
}

function Admin() {
  const [user, setUser] = useState<string>();
  const [showAddForm, setShowAddForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const getUser = async () => {
      try {
        const url = API_ROUTES.User;
        const response = await fetch(url, {
          // headers: {'X-CSRFToken': cookies.get("csrftoken")},
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
        <AddAnimalForm />
      </>
      }
    </Box>
  )
}

export default Admin;