import { useForm, SubmitHandler } from 'react-hook-form'
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

  const onSubmit: SubmitHandler<LoginDetails> = async (formData) => {

  console.log(formData);
  console.log(errors);

  const url = API_ROUTES.Login

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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

      throw new Error(`Response status: ${response.status}. ${json.detail}`);
    }
  } catch (error){
    console.error(error);
  }
  }

  return (
    <>
      <Box position='relative' h='100%' display='flex' justifyContent='center' alignItems='center'>
        <Center w='25%' padding={25} className="form_box">
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
    </>
  );
}

export default Login;