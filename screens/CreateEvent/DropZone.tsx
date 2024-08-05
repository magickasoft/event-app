import React from 'react';
import {Card, Icon, DownloadIcon} from '@gluestack-ui/themed';

import {BASE_API} from '@/lib/axios/client';
import {useDropzone} from 'react-dropzone';

import {S3Image} from './S3Image';

type DropZoneProps = {
  imagesLimit?: number;
  value: string[];
  onChange: (value: string[]) => void;
};

export const DropZone = ({imagesLimit = 6, value, onChange}: DropZoneProps) => {
  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        const loadToS3 = async () => {
          const binaryData = reader.result;
          try {
            const {data} = await BASE_API.post('/images', binaryData, {
              headers: {
                'Content-Type': file.type,
              },
            });
            if (data?.id) {
              const newValue = [...value, data.id];
              onChange(newValue);
            }
          } catch (e) {
            console.log(e);
          }
        };
        reader.onload = loadToS3;
      });
    },
    [value, onChange],
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    maxFiles: 1,
    onDrop,
  });

  const show = value.length < imagesLimit;

  return (
    <>
      {value.map((imageId: string) => (
        <S3Image key={imageId} imageId={imageId} />
      ))}
      {show ? (
        <Card borderRadius="$3xl" overflow="hidden" variant="filled" mr="$2" mt="$2" width="96px" height="96px">
          <div
            style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Icon as={DownloadIcon} m="$2" w="$4" h="$4" />
          </div>
        </Card>
      ) : null}
    </>
  );
};
