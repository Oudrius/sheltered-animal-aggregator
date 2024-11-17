import { useState, useEffect } from "react";
import API_ROUTES from "../config/api";
import { useNavigate } from "react-router-dom";
import AddAnimalForm from "./AddAnimalForm";
import { Box, Center, Text } from "@chakra-ui/react";
import Logout from "./Logout";
import './styles/form.css'

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
      <Box
        w='1350px'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        bg='rgb(255, 255, 255, 0.3)'
        py='60px'
        px='40px'
        border='1px solid  rgb(255, 255, 255, 0.5)'
        borderRadius='40px'
        mb='30px'
      >  
        {user && showAddForm &&
        <>
        <Text mb={3}>Prisijungęs kaip: {user}</Text>
        <Box>
          <Logout xcsrf={xcsrf? xcsrf: ''}/>
        </Box>
        <Center>
          <Box position='relative' h='100%' display='flex' justifyContent='center' alignItems='center'>
            <AddAnimalForm xcsrf={xcsrf? xcsrf: ''}/>
          </Box>
        </Center>
        </>
        }
      </Box>
    </Box>
  )
}

export default Admin;