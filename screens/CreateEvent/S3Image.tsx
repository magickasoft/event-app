import React from 'react';
import {Image} from '@gluestack-ui/themed';

import {useS3URL} from '@/hooks/useS3URL';

type S3ImageProps = {
  imageId?: string;
};

export const S3Image = ({imageId}: S3ImageProps) => {
  const {url} = useS3URL(imageId);

  return url ? (
    <Image
      mr="$2"
      mt="$2"
      size="lg"
      borderRadius="$3xl"
      source={{
        uri: url,
      }}
    />
  ) : null;
};
