import {Box, Button, ButtonText, Center, Heading, Text, VStack} from '@gluestack-ui/themed';

import StyledExpoRouterLink from '../../components/StyledExpoRouterLink';
import GuestLayout from '../../layouts/GuestLayout';

// href="(tabs)/map"
function ActionButtons() {
  return (
    <VStack
      space="xs"
      mt="$10"
      sx={{
        '@md': {
          mt: '$12',
        },
      }}>
      <Button
        sx={{
          ':hover': {
            bg: '$backgroundLight100',
          },
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        backgroundColor="$backgroundLight0">
        <StyledExpoRouterLink href="/login">
          <ButtonText fontWeight="$bold" textDecorationLine="none" color="$primary500">
            LOGIN
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>

      <Button
        sx={{
          ':hover': {
            bg: '$backgroundLight0',
            _text: {
              color: '$primary500',
            },
          },
        }}
        my="$4"
        size="md"
        variant="outline"
        borderColor="$borderLight0"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <StyledExpoRouterLink href="/signup">
          <ButtonText textDecorationLine="none" color="$textLight50">
            SIGN UP
          </ButtonText>
        </StyledExpoRouterLink>
      </Button>
    </VStack>
  );
}

export default function SplashScreen() {
  return (
    <GuestLayout>
      <Center w="$full" flex={1}>
        <Box w="$full" px="$4" justifyContent="center">
          <Box alignItems="center" justifyContent="center">
            <Heading color="$textLight50" sx={{_dark: {color: '$textDark50'}}}>
              Event
            </Heading>
            <Text
              fontSize="$md"
              fontWeight="normal"
              color="$primary300"
              sx={{
                _dark: {color: '$textDark400'},
              }}>
              Discover nearby activities & events
            </Text>
          </Box>
          <ActionButtons />
        </Box>
      </Center>
    </GuestLayout>
  );
}
