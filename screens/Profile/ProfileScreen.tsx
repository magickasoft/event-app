import React from 'react';
import {Button, Box, ButtonText, Heading} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';
import {useSession} from '@/hooks/useSession';
import {SelfCard} from './SelfCard';

const Profile = () => {
  const {signOut} = useSession();
  return (
    <GuestLayout>
      <Box px="$4" py="$8" flex={1} bg="$backgroundLight0">
        <Heading mb="$8" fontSize="$2xl">
          Profile
        </Heading>
        <SelfCard />
        <Button
          variant="solid"
          size="lg"
          mt="$5"
          onPress={() => {
            signOut();
          }}>
          <ButtonText fontSize="$sm">Sign Out</ButtonText>
        </Button>
      </Box>
    </GuestLayout>
  );
};

export default Profile;
