import axios, { AxiosRequestConfig } from 'axios';
import intialiseClient, { client } from './client';
import * as SecureStore from 'expo-secure-store';
export const getNotesByUserId = async (user_id: number) => {
  try {
    const client = await intialiseClient();
    if (!client) {
      return null;
    }
    const result = await client.get('/api/subjects/note/' + user_id);
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

export const getNotesBySubjectId = async (subject_id: number) => {
  try {
    const client = await intialiseClient();
    if (!client) {
      return null;
    }
    const result = await client.get('/api/notes/' + subject_id);
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

export const createNotesBySubjectId = async (
  note_title: string,
  subject_id: number,
  file: any
) => {
  try {
    console.log('[createNotesBySubjectId]');
    const jwt = await SecureStore.getItemAsync('access_token');
    // const formData = new FormData();
    // console.log('[createNotesBySubjectId] [note_title] :', note_title);
    // console.log('[createNotesBySubjectId] [subject_id] :', subject_id);
    // console.log('[createNotesBySubjectId] [pdfFile] :', file.name);
    // formData.append('note_title', note_title);
    // formData.append('subject_id', subject_id.toString());
    // formData.append('pdfFile', file);
    // const config: AxiosRequestConfig = {
    //   method: 'post',
    //   url: '/api/notes',
    //   responseType: 'json',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   transformRequest: (data, headers) => {
    //     // !!! override data to return formData
    //     // since axios converts that to string
    //     return formData;
    //   },
    //   data: formData,
    // };
    // console.log('formData ; ', formData);
    // console.log('file in createNotesBySubjectId :', file);
    // console.log('client: in createNotesBySubjectId :', client.defaults);
    // const result = await client.post(config);

    const data = { note_title: note_title, subject_id: subject_id };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('pdfFile', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    } as any);
    const result = await axios({
      url: 'https://insight-sg-backend.azurewebsites.net/api/notes',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + jwt,
      },
    });

    if (result.status === 200) {
      console.log('result.data : ', result.data);
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log('[createNotesBySubjectId] [error] :', error);
    const { response } = error;
    if (response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
