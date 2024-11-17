import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import API_ROUTES from "../config/api";
import {
  Center,
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import './styles/form.css'
import { useEffect, useState } from 'react';

interface LoginDetails {
  username: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginDetails>();

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
      console.log(json);

      const xcsrftoken = response.headers.get('X-CSRFToken');
      if (xcsrftoken) {
        console.log(xcsrftoken);
        setXcsrf(xcsrftoken);
      }

    }
    setCookies();
  }, [])

  const [xcsrf, setXcsrf] = useState<string>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginDetails> = async (formData) => {

  try {
    const url = API_ROUTES.Login

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': xcsrf? xcsrf: '',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      if (json.detail) {
        setError('root', {
          "message": json.detail
        })
      }

      throw new Error(`Response status: ${response.status}: ${json.detail}`);
    }

    else {
      const sessionUrl = API_ROUTES.Session
      const sessionCheck = await fetch(sessionUrl, {
        credentials: 'include'
      });
      const sessionCheckResponse = await sessionCheck.json();
    
      if (sessionCheck.ok) {
        console.log('session check:')
        console.log(sessionCheckResponse)
        navigate('/admin');
      }
      else {
        console.error(`Status: ${sessionCheck.status}`, sessionCheckResponse.detail);
      }
    }
  } catch (error){
    console.error(error);
  }
  }

  return (
    <>
      <Box
        w='1350px'
        display='flex'
        justifyContent='center'
        bg='rgb(255, 255, 255, 0.3)'
        py='60px'
        px='40px'
        border='1px solid  rgb(255, 255, 255, 0.5)'
        borderRadius='40px'
      >  
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Center padding={25} className="form_box">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.message && 
              <p>{ errors.root.message }</p>
            }
              <Stack spacing={4} w='100%'>
                <FormControl isInvalid={!!errors.username}>
                  <Input type='text' placeholder='Slapyvardis' className="form_box-input" {...register('username', {
                    required: "Įveskite slapyvardį."
                  })}/>
                  {errors.username?.message && (
                    <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <Input type='password' placeholder='Slaptažodis' className="form_box-input" {...register('password', {
                    required: "Įveskite slaptažodį.",
                  })}/>
                {errors.password?.message && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
                </FormControl>
                <Button type='submit' className="form_box-input">Submit</Button>
              </Stack>
          </form>
        </Center>
      </Box>
    </Box>
    </>
  );
}

export default Login;