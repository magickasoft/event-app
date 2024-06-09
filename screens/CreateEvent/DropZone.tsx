import React from 'react';
import {Card, Icon, DownloadIcon, Image} from '@gluestack-ui/themed';

import {S3_API} from '@/lib/axios/client';
import {useDropzone} from 'react-dropzone';

const rout = '/images';
export const DropZone = () => {
  const [id, setId] = React.useState(null);
  const [pic, setPic] = React.useState('');
  const onDrop = React.useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const binaryData = reader.result;
        try {
          const {data} = await S3_API.post(rout, binaryData, {
            headers: {
              'Content-Type': file.type,
            },
          });
          if (data?.id) {
            setId(data.id);
          }
        } catch (e) {
          console.log(e);
        }
      };
    });
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    maxFiles: 1,
    onDrop,
  });

  const getImage = async () => {
    try {
      const {data} = await S3_API.get(`${rout}/${id}`, {responseType: 'arraybuffer'});
      const blob = new Blob([data], {
        type: 'image/jpeg',
      });
      const objectURL = URL.createObjectURL(blob);
      setPic(objectURL);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (id) {
      getImage();
    }
  }, [id]);

  if (pic) {
    return (
      <Image
        mr="$2"
        size="lg"
        borderRadius="$3xl"
        source={{
          uri: pic,
        }}
      />
    );
  }

  return (
    <Card borderRadius="$3xl" overflow="hidden" variant="filled" mr="$2" width="96px" height="96px">
      <div
        style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Icon as={DownloadIcon} m="$2" w="$4" h="$4" />
      </div>
    </Card>
  );
};
