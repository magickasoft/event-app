import React, {useState} from 'react';
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

const createEventSchema = z.object({
  eventPictures: z.array(z.string()).min(1, 'Images is required'),
  eventName: z.string().min(1, 'Event name is required'),
  description: z.string(),
  price: z.number(),
  maxNumberOfPeople: z.number(),
});

type CreateEventSchemaType = z.infer<typeof createEventSchema>;

const mockValues = {
  eventTypes: ['RESTAURANT'],
  gender: 'ALL',
  locationLatitude: 54.84169108416528,
  locationLongitude: 83.10342921441519,
  ageFrom: 25,
  ageTo: 100,
};

const defaultValues = isDev
  ? {
      eventPictures: [],
      eventName: 'eventName',
      description: 'eventDescription',
      price: 1500,
      maxNumberOfPeople: 10,
    }
  : ({
      eventPictures: [],
      eventName: '',
      description: '',
      price: 1,
      maxNumberOfPeople: 1,
    } satisfies CreateEventSchemaType);

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
        <FormControl my="$2" isInvalid={!!errors.eventPictures} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Add Images</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="eventPictures"
            defaultValue={[]}
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({eventPictures: value});
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
            <FormControlErrorText>{errors?.eventPictures?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.eventName} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Event name</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="eventName"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({eventName: value});
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
            <FormControlErrorText>{errors?.eventName?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.description} isRequired={true}>
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

        <FormControl my="$2">
          <FormControlLabel>
            <FormControlLabelText>Select Event Type</FormControlLabelText>
          </FormControlLabel>
          <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Концерты</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Спорт</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Искусство</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Бар</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Прогулка</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Другое</BadgeText>
              <BadgeIcon as={GlobeIcon} ml="$2" />
            </Badge>
          </VStack>
        </FormControl>

        <FormControl my="$2" isInvalid={!!errors.maxNumberOfPeople} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>Select max number of people</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="maxNumberOfPeople"
            defaultValue=""
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

        {/* <FormControl my="$2">
          <FormControlLabel>
            <FormControlLabelText>Who can see my event on the map</FormControlLabelText>
          </FormControlLabel>
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="All" value="all" />
                <SelectItem label="Contacts" value="contacts" />
                <SelectItem label="Subscribers" value="subscribers" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl> */}

        {/* <FormControl my="$2">
          <FormControlLabel>
            <FormControlLabelText>Who can join me</FormControlLabelText>
          </FormControlLabel>
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="All" value="all" />
                <SelectItem label="Contacts" value="contacts" />
                <SelectItem label="Subscribers" value="subscribers" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl> */}

        <FormControl my="$2">
          <FormControlLabel>
            <FormControlLabelText>People filter</FormControlLabelText>
          </FormControlLabel>
          <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>All</BadgeText>
              <BadgeIcon as={InfoIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Male only</BadgeText>
              <BadgeIcon as={InfoIcon} ml="$2" />
            </Badge>
            <Badge mt="$2" mr="$2" size="lg" variant="solid" borderRadius="$lg" action="info">
              <BadgeText>Female only</BadgeText>
              <BadgeIcon as={InfoIcon} ml="$2" />
            </Badge>
          </VStack>
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
