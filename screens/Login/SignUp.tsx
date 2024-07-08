import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  FormControl,
  Box,
  LinkText,
  Input,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  ButtonText,
  Heading,
  ArrowLeftIcon,
  InputField,
  InputSlot,
} from '@gluestack-ui/themed';

import {Controller, useForm} from 'react-hook-form';
import {AlertTriangle, EyeIcon, EyeOffIcon} from 'lucide-react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Keyboard} from 'react-native';
import {useSession} from '../../hooks/useSession';

import GuestLayout from '../../layouts/GuestLayout';

import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';
import {isDev} from '../../constants/ui';

const signUpSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  second_name: z.string().min(1, 'Second name is required'),
  patronymic: z.string().min(1, 'Patronymic is required'),
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(6, 'Must be at least 8 characters in length'),
  // .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  // .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  // .regex(new RegExp('.*\\d.*'), 'One number')
  // .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'One special character'),
  rememberme: z.boolean().optional(),
});

type SignUpSchemaType = {
  first_name: string;
  second_name: string;
  patronymic: string;
  phone: string;
  password: string;
  rememberme?: boolean | undefined;
};

const defaultValues = isDev
  ? {
      first_name: 'Evgeny',
      second_name: 'Shmakov',
      patronymic: 'Sergeevich',
      phone: '+79537647035',
      password: 'magickasoft',
      rememberme: true,
    }
  : ({
      first_name: '',
      second_name: '',
      patronymic: '',
      phone: '',
      password: '',
      rememberme: false,
    } satisfies SignUpSchemaType);

const SignUpForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const {signUp} = useSession();

  const onSubmit = (_data: SignUpSchemaType) => {
    try {
      signUp(_data);
      reset();
    } catch (e) {}
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl my="$3" isInvalid={!!errors.first_name} isRequired={true}>
          <Controller
            name="first_name"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({first_name: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="First name"
                  fontSize="$sm"
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
            <FormControlErrorText>{errors?.first_name?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$3" isInvalid={!!errors.second_name} isRequired={true}>
          <Controller
            name="second_name"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({second_name: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="Second name"
                  fontSize="$sm"
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
            <FormControlErrorText>{errors?.second_name?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$3" isInvalid={!!errors.patronymic} isRequired={true}>
          <Controller
            name="patronymic"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({patronymic: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="Patronymic"
                  fontSize="$sm"
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
            <FormControlErrorText>{errors?.patronymic?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$3" isInvalid={!!errors.phone} isRequired={true}>
          <Controller
            name="phone"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({phone: value});
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input>
                <InputField
                  placeholder="Phone"
                  fontSize="$sm"
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
            <FormControlErrorText>{errors?.phone?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$3" isInvalid={!!errors.password} isRequired={true}>
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signUpSchema.parseAsync({
                    password: value,
                  });
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
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={handleState} pr="$3">
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>{errors?.password?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({field: {onChange, value}}) => (
          <Checkbox size="sm" value="Remember me" isChecked={value} onChange={onChange} alignSelf="flex-start" mt="$5">
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel
              sx={{
                _text: {
                  fontSize: '$sm',
                },
              }}>
              I accept the{' '}
              <Link>
                <LinkText
                  sx={{
                    _ios: {
                      marginTop: '$0.5',
                    },
                    _android: {
                      marginTop: '$0.5',
                    },
                  }}>
                  Terms of Use
                </LinkText>
              </Link>{' '}
              &{' '}
              <Link>
                <LinkText
                  sx={{
                    _ios: {
                      marginTop: '$0.5',
                    },
                    _android: {
                      marginTop: '$0.5',
                    },
                  }}>
                  Privacy Policy
                </LinkText>
              </Link>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button mt="$5" variant="solid" size="lg" onPress={handleSubmit(onSubmit)}>
        <ButtonText fontSize="$sm">SIGN UP</ButtonText>
      </Button>
    </>
  );
};

const SignUp = () => {
  return (
    <GuestLayout>
      <Box>
        <VStack px="$3" mt="$4.5" space="md" mb="$4">
          <StyledExpoRouterLink href="/">
            <Icon as={ArrowLeftIcon} color="$textLight50" sx={{_dark: {color: '$textDark50'}}} />
            <Text ml="$2" color="$textLight50" sx={{_dark: {color: '$textDark50'}}} fontSize="$lg">
              Back
            </Text>
          </StyledExpoRouterLink>
        </VStack>
      </Box>
      <Box
        px="$4"
        py="$8"
        flex={1}
        bg="$backgroundLight0"
        justifyContent="space-between"
        borderTopLeftRadius="$2xl"
        borderTopRightRadius="$2xl"
        borderBottomRightRadius="$none">
        <Heading mb="$8" fontSize="$2xl">
          Sign up
        </Heading>

        <SignUpForm />

        <HStack space="xs" alignItems="center" justifyContent="center" mt="auto">
          <Text color="$textLight500" fontSize="$sm" sx={{_dark: {color: '$textDark400'}}}>
            Already have an account?
          </Text>

          <StyledExpoRouterLink href="/login">
            <LinkText fontSize="$sm">Sign In</LinkText>
          </StyledExpoRouterLink>
        </HStack>
      </Box>
    </GuestLayout>
  );
};

export default SignUp;
