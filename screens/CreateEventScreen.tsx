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
import {router} from 'expo-router';

import GuestLayout from '../layouts/GuestLayout';

import {isDev} from '../constants/ui';

const createEventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  desc: z.string().min(1, 'Event description is required'),
  price: z.number(),
  amount: z.number(),
});

type CreateEventSchemaType = z.infer<typeof createEventSchema>;

const defaultValues = isDev
  ? {name: 'test event name', desc: '', price: 0, amount: 0}
  : ({name: '', desc: '', price: 0, amount: 0} satisfies CreateEventSchemaType);

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

  const onSubmit = (_data: CreateEventSchemaType) => {
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
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl my="$2">
          <Avatar bgColor="$amber600" size="lg" borderRadius="$full">
            <AvatarFallbackText>John Doe</AvatarFallbackText>
          </Avatar>
        </FormControl>

        <FormControl my="$2">
          <FormControlLabel>
            <FormControlLabelText>Add Location Details</FormControlLabelText>
          </FormControlLabel>
          <VStack w="$full" flex={1} justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
            <Image
              mr="$2"
              size="lg"
              borderRadius="$3xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              }}
            />
            <Image
              mr="$2"
              size="lg"
              borderRadius="$3xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              }}
            />
          </VStack>
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

        <FormControl my="$2" isInvalid={!!errors.desc} isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Event description</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="desc"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({
                    desc: value,
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
            <FormControlErrorText>{errors?.desc?.message}</FormControlErrorText>
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

        <FormControl my="$2" isInvalid={!!errors.amount} isRequired={false}>
          <FormControlLabel>
            <FormControlLabelText>select amount of people</FormControlLabelText>
          </FormControlLabel>
          <Controller
            name="amount"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await createEventSchema.parseAsync({amount: value});
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
                  placeholder="Select amount of people"
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
            <FormControlErrorText>{errors?.amount?.message}</FormControlErrorText>
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
            <FormControlErrorText>{errors?.price?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$2">
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
        </FormControl>

        <FormControl my="$2">
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
        </FormControl>

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
