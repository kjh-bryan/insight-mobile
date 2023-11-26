import client from './client';
import * as FileSystem from 'expo-file-system';

export const postSpeechToText = async (audio: any) => {
  try {
    const result = await FileSystem.uploadAsync(
      `${client.defaults.baseURL}/api/speechtotext`,
      audio.getURI(),
      {
        httpMethod: 'POST',
        fieldName: 'audioFile',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      }
    );
    // const formData = new FormData();
    // formData.append('audioFile',audio);
    //const result = await client.post('/api/speechtotext');

    return result;
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const healthCheck = async () => {
  try {
    console.log('healthCheck client.get');
    console.log(client.defaults.baseURL);
    const result = await client.get('/healthcheck');
    console.log('Print result ' + result);

    return result;
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
