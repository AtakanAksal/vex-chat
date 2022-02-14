import axios from 'axios';
import useSWR from 'swr';
import * as FileSystem from 'expo-file-system';

const API_ENDPONT = 'http://192.168.1.74:8000/v1';
const LOGIN = `${API_ENDPONT}/auth/login`;
const CHANNEL_LIST = `${API_ENDPONT}/expochat/channels`;
const SINGLE_CHANNEL = `${API_ENDPONT}/expochat/channels`;
const USER_LIST = `${API_ENDPONT}/expochat/userlist`;
const GROUP_ENDPOINT = `${API_ENDPONT}/expochat/channels`;

const ADD_PERSON_GROUP = `${API_ENDPONT}/expochat/channelparticipants/many`;
const KICK_PERSON_GROUP = `${API_ENDPONT}/expochat/channelparticipants/kick`;
const LEAVE_GROUP = `${API_ENDPONT}/expochat/channelparticipants/leave`;

const CHANNEL_MESSAGES = `${API_ENDPONT}/expochat/channelmessages`;

interface ILoginResponse {
  access_token: string;
  email: string;
  id: number;
  result: string;
  user: string;
}

export const postLogin = async (postData: FormData) => {
  return new Promise<ILoginResponse>((resolve, reject) => {
    axios
      .post<ILoginResponse>(LOGIN, postData)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const useDataChannels = (token: string) => {
  const { data, error, mutate } = useSWR([CHANNEL_LIST, token], fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDataUserList = (token: string) => {
  const { data, error } = useSWR([USER_LIST, token], fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDataChannelMessages = (id: string, token: string) => {
  const { data, error, mutate } = useSWR(
    [`${CHANNEL_MESSAGES}?channel=${id}`, token],
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDataChannelContent = (id: string, token: string) => {
  const { data, error, mutate } = useSWR(
    [`${SINGLE_CHANNEL}/${id}`, token],
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const fetcher = async (url: string, token: string) => {
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};

export const changeGroupContent = async (
  postData: FormData,
  token: string,
  convoID: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${GROUP_ENDPOINT}/${convoID}`, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const changeGroupImage = async (
  result: any,
  token: string,
  convoID: string,
) => {
  return new Promise((resolve, reject) => {
    FileSystem.uploadAsync(`${GROUP_ENDPOINT}/${convoID}`, result.uri, {
      httpMethod: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'image',
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const createGroup = async (
  token: string,
  imgUri: string,
  name: string,
  isPrivate: string,
  type: string,
) => {
  return new Promise((resolve, reject) => {
    FileSystem.uploadAsync(`${GROUP_ENDPOINT}`, imgUri, {
      parameters: { name, is_private: isPrivate, type },
      httpMethod: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'image',
    })
      .then(res => {
        resolve(JSON.parse(res.body));
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteGroup = async (token: string, convoID: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${GROUP_ENDPOINT}/${convoID}/delete`,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const addPersonToGroup = async (postData: FormData, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADD_PERSON_GROUP}`, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const kickPersonFromGroup = async (
  postData: FormData,
  token: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${KICK_PERSON_GROUP}`, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const leaveGroup = async (postData: FormData, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${LEAVE_GROUP}`, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
