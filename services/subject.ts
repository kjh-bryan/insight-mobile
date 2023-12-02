import client from './client';

export const getSubjectsByUserId = async (user_id: number) => {
  try {
    console.log('[getSubjectsByUserId] ');
    const result = await client.get('/api/subjects/' + user_id);
    console.log('result, ', result.data.data);

    if (result.status === 200) {
      console.log('result.status');
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const createSubjectByUserId = async (
  subject_title: string,
  subject_category: string,
  user_id: number
) => {
  try {
    const result = await client.post('/api/subjects', {
      subject_title,
      subject_category,
      user_id,
    });

    if (result.status === 200) {
      console.log('createSubjectByUserId : ', result.data.data);
      return result.data.data;
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
