import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import {
    Center,
    Box,
    Stack,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Text,
    Textarea,
    Select,
    Image,
  } from '@chakra-ui/react'
  import { useEffect, useRef, useState } from 'react';
  import API_ROUTES from "../config/api";

interface XcsrfProp {
  xcsrf: string;
}

interface Species {
  id: number;
  name: string;
}

function AddAnimalForm({ xcsrf}: XcsrfProp) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors }
  } = useForm<AnimalDetails>();

  const [species, setSpecies] = useState<Species[]>([]);
  const [img, setImg] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>();
  const { ref: registerRef, ...rest } = register('pictureUrl');

  useEffect(() => {
    const getSpecies = async () => {
      const url = API_ROUTES.Species

      try {
        const response = await fetch(url);
        const json = await response.json()

        if (!response.ok) {
          throw new Error(`Status: ${response.status} ${json.detail}`);
        }
        setSpecies(json);
      }

      catch (e) {
        console.error('Could not retrieve species.', e);
      }
    }
    getSpecies();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgFile(file);
      const pictureUrl = file && URL.createObjectURL(file);
      setImg(pictureUrl);
    }
  }

  const onUpload = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  }

  const onSubmit:SubmitHandler<AnimalDetails> = async (data) => {
    const url = API_ROUTES.Animals;

    // Create FormData object
    const formData = new FormData();

    // Append all form fields
    formData.append('name', data.name? data.name: '');
    if (data.age) formData.append('age', data.age.toString());
    formData.append('sex', data.sex? data.sex: ''); 
    if (data.specialNeeds) formData.append('special_needs', data.specialNeeds);
    if (data.description) formData.append('description', data.description);
    if (imgFile) formData.append('picture', imgFile);
    formData.append('species', data.species);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': xcsrf? xcsrf: '',
        },
        credentials: 'include',
        body: formData
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status}: ${json.detail}`);
      }
      else {
        console.log('Animal added successfully!');
      }
    }
    catch (error) {
      console.error(error);
    }
    
  }

  return (
    <>
      <Box position='relative' h='100%' display='flex' justifyContent='center' alignItems='center'>
        <Center width='600px' flexDirection='column' padding={25} className="form_box">
          <Text fontSize='3xl' mb={5}>Naujas gyvūnas</Text>
            <form className='add-animal' onSubmit={handleSubmit(onSubmit)}>
              {errors.root?.message && 
                <p>{ errors.root.message }</p>
              }
                <Stack spacing={4} w='100%'>
                  <FormControl>
                    <FormLabel>Gyvūno vardas</FormLabel>
                    <Input type='text' placeholder='Gyvūno vardas' className="form_box-input" {...register('name')}/>
                  </FormControl>
                  <FormControl isInvalid={!!errors.age}>
                    <FormLabel>Gyvūno amžius</FormLabel>
                    <Input type='text' placeholder='Gyvūno amžius' className="form_box-input" {...register('age', { pattern: {
                      value: /^[0-9]*$/i,
                      message: 'Įveskite tik skaičius.'
                    } })}/>
                    {errors.age?.message && (
                      <FormErrorMessage>{errors.age.message}</FormErrorMessage>
                    )}
                    <FormHelperText>Įveskite skaičių</FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Gyvūno lytis</FormLabel>
                    <Controller control={control} name='sex' render={({ field }) => (
                      <Select colorScheme='teal' placeholder='Pasirinkite lytį' className="form_box-input" {...field}>
                        <option value='male'>Patinas</option>
                        <option value='female'>Patelė</option>
                        <option value='unknown'>Nežinoma</option>
                      </Select>
                    )} />
                  </FormControl>
                  <FormControl isInvalid={!!errors.specialNeeds}>
                    <FormLabel>Specialūs poreikiai</FormLabel>
                    <Textarea height='200px' resize='none' placeholder='Aprašykite specialius poreikius' className="form_box-input" {...register('specialNeeds', {
                      maxLength: {
                        value: 254,
                        message: 'Tekstas turi būti trumpesnis nei 254 simboliai.'
                      }})}/>
                    {errors.specialNeeds?.message && (
                      <FormErrorMessage>{errors.specialNeeds.message}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Gyvūno aprašymas</FormLabel>
                    <Textarea height='400px' resize='none' placeholder='Aprašykite gyvūną' className="form_box-input" {...register('description')}/>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Gyvūno rūšis</FormLabel>
                    <Controller control={control} name='species' render={({ field }) => (
                      <Select placeholder='Pasirinkite rūšį' className="form_box-input" {...field}>
                        {species.map((item) => {
                          return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                      </Select>
                    )} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Gyvūno nuotrauka</FormLabel>
                    <Controller control={control} name='pictureUrl' render={({ field }) => (
                      <Input type='file' display='none' ref={(e) => {
                        field.ref(e);
                        registerRef(e);
                        if (e) {
                          hiddenInputRef.current = e;
                        }
                      }} onChange={(e) => {
                        field.onChange(e);
                        handleFileUpload(e);
                      }}/>
                    )} />
                    <Image src={img} />
                    <Button onClick={onUpload}>Įkelti</Button>
                  </FormControl>
                  <Button type='submit' className="form_box-input" mt='5'>Patvirtinti</Button>
                </Stack>
            </form>
        </Center>
      </Box>
    </>
  );
}

export default AddAnimalForm;