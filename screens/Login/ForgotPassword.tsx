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
  Icon,
  ToastTitle,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  ButtonText,
  ArrowLeftIcon,
  Heading,
  Center,
} from '@gluestack-ui/themed';
import GuestLayout from '../../layouts/GuestLayout';

import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Keyboard} from 'react-native';

import {AlertTriangle} from 'lucide-react-native';

import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';
import {router} from 'expo-router';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});
type SignUpSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const toast = useToast();

  const onSubmit = (_data: SignUpSchemaType) => {
    toast.show({
      placement: 'bottom right',
      render: ({id}) => {
        return (
          <Toast nativeID={id} variant="accent" action="success">
            <ToastTitle>OTP sent successfully </ToastTitle>
          </Toast>
        );
      },
    });
    reset();

    // Navigate screen to appropriate location
    router.push('/verify-otp');
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <GuestLayout>
      <Box>
        <VStack px="$3" mt="$4.5" space="md" mb="$4">
          <StyledExpoRouterLink href="..">
            <Icon size="md" as={ArrowLeftIcon} color="$textLight50" sx={{_dark: {color: '$textDark50'}}} />
            <Text ml="$2" color="$textLight50" sx={{_dark: {color: '$textDark50'}}} fontSize="$lg">
              Back
            </Text>
          </StyledExpoRouterLink>
        </VStack>
      </Box>
      <Box px="$4" py="$8" flex={1} bg="$backgroundLight0">
        <VStack space="md" alignItems="center" sx={{'@md': {alignItems: 'flex-start'}}}>
          <Heading
            fontSize="$xl"
            textAlign="center"
            sx={{
              '@md': {
                textAlign: 'left',
                fontSize: '$2xl',
              },
            }}>
            Forgot Password?
          </Heading>
          <Text
            fontSize="$sm"
            fontWeight="normal"
            textAlign="center"
            sx={{
              '@md': {
                textAlign: 'left',
              },
            }}>
            Not to worry! Enter email address associated with your account and we'll send a link to reset your password.
          </Text>
        </VStack>

        <FormControl my="$8" isInvalid={(!!errors.email || isEmailFocused) && !!errors.email} isRequired={true}>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await forgotPasswordSchema.parseAsync({
                    email: value,
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
                  placeholder="Email"
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
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>{errors?.email?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button variant="solid" size="lg" onPress={handleSubmit(onSubmit)}>
          <ButtonText fontSize="$sm">Send OTP</ButtonText>
        </Button>
      </Box>
    </GuestLayout>
  );
};

export default ForgotPassword;
