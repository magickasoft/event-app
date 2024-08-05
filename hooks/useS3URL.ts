import * as React from 'react';
import {BASE_API} from '@/lib/axios/client';

export function useS3URL(id?: string) {
  const [url, setURL] = React.useState<string>('');

  const getImageURL = async () => {
    try {
      const {data} = await BASE_API.get(`/images/${id}`, {responseType: 'arraybuffer'});
      const blob = new Blob([data], {
        type: 'image/jpeg',
      });
      const objectURL = URL.createObjectURL(blob);
      setURL(objectURL);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (id) {
      getImageURL();
    }
  }, [id]);

  return {url};
}
