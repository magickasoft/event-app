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
  InputIcon,
  FormControlHelper,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  ButtonText,
  ArrowLeftIcon,
  Heading,
  LinkText,
  InputSlot,
} from '@gluestack-ui/themed';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Keyboard} from 'react-native';
import {AlertTriangle, EyeIcon, EyeOffIcon} from 'lucide-react-native';

import GuestLayout from '../../layouts/GuestLayout';
import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';

import {useSession} from '../../hooks/useSession';
import {isDev} from '../../constants/ui';

const signInSchema = z.object({
  login: z.string().min(1, 'Login is required'),
  password: z.string().min(6, 'Must be at least 8 characters in length'),
  // .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  // .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  // .regex(new RegExp('.*\\d.*'), 'One number')
  // .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), 'One special character'),
});

export type SignInSchemaType = {
  login: string;
  password: string;
};

const defaultValues = isDev
  ? {login: '+79537647035', password: 'magickasoft'}
  : ({login: '', password: ''} satisfies SignInSchemaType);

const SignInForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    defaultValues,
    resolver: zodResolver(signInSchema),
  });

  const {signIn} = useSession();

  const onSubmit = async (_data: SignInSchemaType) => {
    try {
      signIn(_data);
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
        <FormControl isInvalid={!!errors.login} isRequired={true}>
          <Controller
            name="login"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({login: value});
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
                  placeholder="Login"
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
            <FormControlErrorText>{errors?.login?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$6" isInvalid={!!errors.password} isRequired={true}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({
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
      <StyledExpoRouterLink ml="auto" href="/forgot-password">
        <LinkText fontSize="$xs">Forgot password?</LinkText>
      </StyledExpoRouterLink>
      <Button variant="solid" size="lg" mt="$5" onPress={handleSubmit(onSubmit)}>
        <ButtonText fontSize="$sm">SIGN IN</ButtonText>
      </Button>
    </>
  );
};

const SignIn = () => {
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
          Sign in
        </Heading>

        <SignInForm />

        <HStack space="xs" alignItems="center" justifyContent="center" mt="auto">
          <Text color="$textLight500" fontSize="$sm" sx={{_dark: {color: '$textDark400'}}}>
            Don't have an account?
          </Text>

          <StyledExpoRouterLink href="/signup">
            <LinkText fontSize="$sm">Sign up</LinkText>
          </StyledExpoRouterLink>
        </HStack>
      </Box>
    </GuestLayout>
  );
};

export default SignIn;
