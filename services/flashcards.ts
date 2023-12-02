import client from './client';

export const getFlashcardsByUserId = async (user_id: number) => {
  try {
    const result = await client.get('/api/subjects/flashcard/' + user_id);
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

export const getFlashcardBySubjectId = async (subject_id: number) => {
  try {
    const result = await client.get('/api/flashcard/' + subject_id);
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

export const createFlashcardBySubjectId = async (
  subject_id: number,
  flashcard_title: string,
  flashcards: []
) => {
  try {
    const result = await client.post('/api/flashcard', {
      subject_id,
      flashcard_title,
      flashcards,
    });
    if (result.status === 200) {
      console.log('result.data : ', result.data.data);
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
