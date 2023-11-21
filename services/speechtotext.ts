import client from './client';
import * as FileSystem from 'expo-file-system';

export const postSpeechToText = async (audio: any) => {
  try {
    console.log(client.defaults.baseURL);
    // const result = await FileSystem.uploadAsync(
    //   `${client.defaults.baseURL}/api/speechtotext`,
    //   audio,
    //   {
    //     httpMethod: 'POST',
    //     fieldName: 'audioFile',
    //   }
    // );

    const result = await client.post('/api/speechtotext');

    return result;
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
