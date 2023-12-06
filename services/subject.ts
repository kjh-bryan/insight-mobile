import store from '../redux/store';
import intialiseClient from './client';
import * as SecureStore from 'expo-secure-store';
export const getSubjectsByUserId = async (user_id: number) => {
  try {
    console.log('[getSubjectsByUserId] ');
    const client = await intialiseClient();

    if (client) {
      const result = await client.get('/api/subjects/' + user_id);
      console.log('result, ', result.data.data);

      if (result.status === 200) {
        console.log('result.status');
        return result.data.data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error: any) {
    console.log('[getSubjectsByUserId] [Catch] :', error);
    return null;
  }
};

export const createSubjectByUserId = async (
  subject_title: string,
  subject_category: string,
  user_id: number
) => {
  try {
    console.log('[createSubjectByUserId]');
    const client = await intialiseClient();
    if (client) {
      const result = await client.post('/api/subjects', {
        subject_title,
        subject_category,
        user_id,
      });

      console.log('[createSubjectByUserId] result : ', result);
      if (result.status === 200) {
        console.log('createSubjectByUserId : ', result.data.data);
        return result.data.data;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
