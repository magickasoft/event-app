import React from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
  Toast,
  Box,
  CheckIcon,
  Checkbox,
  Icon,
  ToastTitle,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  TextareaInput,
  Textarea,
  InputIcon,
  FormControlHelper,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  ChevronDownIcon,
  ButtonText,
  ArrowLeftIcon,
  Heading,
  LinkText,
  InputSlot,
  Badge,
  BadgeText,
  BadgeIcon,
  GlobeIcon,
  InfoIcon,
  Avatar,
  AvatarFallbackText,
  Image,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@gluestack-ui/themed';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Keyboard} from 'react-native';
import {AlertTriangle} from 'lucide-react-native';
import {BASE_API} from '@/lib/axios/client';

import GuestLayout from '../../layouts/GuestLayout';

import {isDev} from '../../constants/ui';
import {DropZone} from './DropZone';
import {DSSelect} from './DSSelect';
import {DSMultiSelect} from './DSMultiSelect';

const createEventSchema = z.object({
  pictures: z.array(z.string()).min(1, 'Images is required'),
  name: z.string().min(15, 'Event name is required'),
  description: z.string().min(20, 'Description is required'),
  price: z.number(),
  maxNumberOfPeople: z.number(),
  gender: z.string(),
  types: z.array(z.string()).min(1, 'event type is required'),
});

type CreateEventSchemaType = z.infer<typeof createEventSchema>;

const mockValues = {
  locationLatitude: 55.03070287791311,
  locationLongitude: 82.924584805415,
  ageFrom: 25,
  ageTo: 100,
};

const listOfEventTypes = [
  {value: 'RESTAURANT', label: 'RESTAURANT'},
  {value: 'BAR', label: 'BAR'},
  {value: 'HOTEL', label: 'HOTEL'},
  {value: 'WELLNESS_CENTER', label: 'WELLNESS CENTER'},
  {value: 'EXCURSION', label: 'EXCURSION'},
  {value: 'MUSEUM', label: 'MUSEUM'},
  {value: 'EXHIBITION', label: 'EXHIBITION'},
  {value: 'THEATER', label: 'THEATER'},
  {value: 'MOVIE', label: 'MOVIE'},
  {value: 'CONCERT', label: 'CONCERT'},
  {value: 'SPORT_EVENT', label: 'SPORT EVENT'},
  {value: 'THEME_PARTY', label: 'THEME PARTY'},
  {value: 'NIGHT_CLUB', label: 'NIGHT CLUB'},
  {value: 'ACTIVITY_FOR_CHILDREN', label: 'ACTIVITY FOR CHILDREN'},
  {value: 'AMUSEMENT_PARK', label: 'AMUSEMENT PARK'},
  {value: 'WATER_PARK', label: 'WATER PARK'},
];

const listOfGenders = [
  {value: 'ALL', label: 'All'},
  {value: 'MALE', label: 'Male only'},
  {value: 'FEMALE', label: 'Female only'},
];

const defaultValues = {
  name: '',
  pictures: [],
  description: '',
  price: 1000,
  maxNumberOfPeople: 10,
  gender: listOfGenders[0].value,
  types: [listOfEventTypes[0].value],
} satisfies CreateEventSchemaType;

const CreateEventForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<CreateEventSchemaType>({
    defaultValues,
    resolver: zodResolver(createEventSchema),
  });

  const toast = useToast();

  const onSubmit = async (_data: CreateEventSchemaType) => {
    try {
      await BASE_API.post('/events', {...mockValues, ..._data});
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Create event successfully</ToastTitle>
            </Toast>
          );
        },
      });
      reset();
    } catch (e: any) {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} action="error">
              <ToastTitle>{e.response?.data?.detail?.msg || 'Error'}</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl my="$2" isInvalid={!!errors.pictures} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Add Images</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="pictures"
            defaultValue={[]}
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({pictures: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, value}}) => (
              <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                <DropZone value={value} onChange={onChange} />
              </VStack>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.pictures?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.name} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Event name</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({name: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Event name"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.name?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.description} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>Event description</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="description"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({
                    description: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Textarea>
                <TextareaInput
                  fontSize="$sm"
                  placeholder="Description"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type="text"
                />
              </Textarea>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>{errors?.description?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.types} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>Select Event Type</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="types"
            defaultValue={[]}
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({types: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, value}}) => (
              <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                <DSMultiSelect items={listOfEventTypes} value={value} onChange={onChange} />
              </VStack>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.types?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.maxNumberOfPeople} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>Select max number of people</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="maxNumberOfPeople"
            defaultValue={0}
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({maxNumberOfPeople: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Select max number of people"
                  type="text"
                  value={value}
                  onChangeText={(text) => onChange(Number(text))}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.maxNumberOfPeople?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.price} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>Select price</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="price"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({price: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Price"
                  type="text"
                  value={value}
                  onChangeText={(text) => onChange(Number(text))}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.price?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.gender} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>People filter</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({gender: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, value}}) => (
              <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
                <DSSelect items={listOfGenders} value={value} onChange={onChange} />
              </VStack>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>{errors?.gender?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
      <Button variant="solid" size="lg" mt="$5" onPress={handleSubmit(onSubmit)}>
        <ButtonText fontSize="$sm">Create event</ButtonText>
      </Button>
    </>
  );
};

const CreateEvent = () => {
  return (
    <GuestLayout>
      <Box px="$4" py="$8" flex={1} bg="$backgroundLight0" justifyContent="space-between">
        <Heading mb="$8" fontSize="$2xl">
          Create event
        </Heading>

        <CreateEventForm />
      </Box>
    </GuestLayout>
  );
};

export default CreateEvent;
