import React from 'react';
import {Text, Box, Heading, Avatar, AvatarFallbackText} from '@gluestack-ui/themed';
import {useQuery} from '@tanstack/react-query';

import {useSession} from '@/hooks/useSession';
import {BASE_API} from '@/lib/axios/client';

const rout = '/authentication/user/';
export const SelfCard = () => {
  const {decodeToken} = useSession();

  const {isLoading, isError, data} = useQuery({
    queryKey: [rout],
    queryFn: () => BASE_API.get(`${rout}${decodeToken?.sub}`),
    refetchOnMount: true,
    select: (response) => response?.data,
  });

  if (isLoading || isError) {
    return null;
  }

  return (
    <Box overflow="hidden" flexDirection="row">
      <Avatar bgColor="$amber600" size="lg" borderRadius="$full" mr="$4">
        <AvatarFallbackText>{`${data?.first_name} ${data?.second_name}`}</AvatarFallbackText>
      </Avatar>
      <Box flex={1}>
        <Heading mb="$1" size="md">
          {data?.first_name} {data?.second_name} {data?.patronymic}
        </Heading>
        {data?.email ? <Text size="sm">{data?.email}</Text> : null}
        {data?.phone ? <Text size="sm">{data?.phone}</Text> : null}
      </Box>
    </Box>
  );
};
