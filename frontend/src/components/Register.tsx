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

interface RegistrationDetails {
  verification_code: string;
  email: string;
  username: string;
  password: string;
  password2: string;
}

function Register() {
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationDetails>();

  const onSubmit: SubmitHandler<RegistrationDetails> =  async (formData) => {
  
    console.log(formData);
    console.log(errors);

    const url = API_ROUTES.Register

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          verification_code: formData.verification_code,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        })
      });
      const json = await response.json();

      console.log(json)
      
      if (!response.ok) {

        if (json.email) {
          setError("email", {
            "message":  json.email[0]
          })
        }

        if (json.username) {
          setError("username", {
            "message": json.username[0]
          })
        }

        if (json.password) {
          setError("password", {
            "message": json.password[0]
          })
        }

        if (json.verification_code) {
          setError("verification_code", {
            "message": json.verification_code[0]
          })
        }
        
        throw new Error(`Response status: ${response.status}. ${json.detail}`);
      }

      } catch (error: any) {
        console.error(error.message);
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
          <Box position='relative' h='100%' display='flex' justifyContent='center' alignItems='center'>
            <Center padding={25} className="form_box">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} w='100%'>
                    <FormControl isInvalid={!!errors.email}>
                      <Input type='email' placeholder='El. Paštas' className="form_box-input" {...register('email', {required: "Įveskite el. pašto adresą."})}/>
                      {errors.email?.message && (
                        <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.username}>
                      <Input type='text' placeholder='Slapyvardis' className="form_box-input" {...register('username', {
                        required: "Įveskite slapyvardį.",
                        minLength: {
                          value: 8,
                          message: "Slapyvardis turi būti bent 6 simbolių ilgio."
                        },
                        maxLength: {
                          value: 36,
                          message: "Slapyvardis turi būti ne ilgesnis nei 36 simboliai."
                        }
                      })}/>
                      {errors.username?.message && (
                        <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                      <Input type='password' placeholder='Slaptažodis' className="form_box-input" {...register('password', {
                        required: "Please enter password.",
                        minLength: {
                          value: 8,
                          message: "Slaptažodis turi būti bent 8 simbolių ilgio."
                        }
                      })}/>
                    {errors.password?.message && (
                      <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                    )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.password2}>
                      <Input type='password' placeholder='Pakartoti slaptažodį' className="form_box-input" {...register('password2', {
                        required: "Pakartokite slaptažodį.",
                        validate: (val: string) => watch('password') !== val ? "Passwords do not match." : true
                      })}/>
                    {errors.password2?.message && (
                      <FormErrorMessage>{errors.password2.message}</FormErrorMessage>
                    )}
                    </FormControl>
                    <FormControl isInvalid={!!errors.verification_code}>
                      <Input type='text' placeholder='Patvirtinimo kodas' className="form_box-input" {...register('verification_code', {
                        required: "Įveskite patvirtinimo kodą."
                      })}/>
                    {errors.verification_code?.message && (
                      <FormErrorMessage>{errors.verification_code.message}</FormErrorMessage>
                    )}
                    </FormControl>
                    <Button type='submit' className="form_box-input">Registruotis</Button>
                  </Stack>
              </form>
            </Center>
          </Box>
        </Box>
      </>
  );
}

export default Register;