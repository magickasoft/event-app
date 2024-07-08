import React from 'react';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Button,
  FormControl,
  Input,
  LinkText,
  InputField,
  ButtonText,
  ArrowLeftIcon,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';
import {z} from 'zod';
import {AlertTriangle} from 'lucide-react-native';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Keyboard} from 'react-native';
import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';
import {isDev} from '../../constants/ui';
import {useSession} from '../../hooks/useSession';

const codeVerificationSchema = z.object({
  verification_code: z.string().min(7, 'Code must be by mask'),
});

type CodeVerificationSchemaType = {
  verification_code: string;
};

const defaultValues = isDev
  ? {verification_code: '555-555'}
  : ({verification_code: ''} satisfies CodeVerificationSchemaType);

const CodeVerificationForm = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<CodeVerificationSchemaType>({
    defaultValues,
    resolver: zodResolver(codeVerificationSchema),
  });

  const {codeVerification} = useSession();

  const onSubmit = (_data: CodeVerificationSchemaType) => {
    codeVerification(_data)
    reset();
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl isInvalid={!!errors.verification_code} isRequired={true}>
          <Controller
            name="verification_code"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await codeVerificationSchema.parseAsync({verification_code: value});
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
                  placeholder="Code"
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
            <FormControlErrorText>{errors?.verification_code?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
      <Button variant="solid" size="lg" mt="$5" onPress={handleSubmit(onSubmit)}>
        <ButtonText fontSize="$sm">CONTINUE</ButtonText>
      </Button>
    </>
  );
}

const CodeVerification = () => {
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
        <VStack space="xs">
          <Heading mb="$8" fontSize="$2xl">
            Enter Code
          </Heading>
          <HStack space="xs" alignItems="center">
            <Text
              mb="$8"
              color="$textLight800"
              sx={{
                '@md': {
                  pb: '$12',
                },
                '_dark': {
                  color: '$textDark400',
                },
              }}
              fontSize="$sm">
              We have sent the code, please check and enter
            </Text>
          </HStack>
        </VStack>

        <CodeVerificationForm />

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

export default CodeVerification;
