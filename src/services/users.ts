import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import type { User } from 'types';
import { usersIndex, usersShow, userWhoami } from 'urls/index';

export const getUser = async (sub: string) => {
  try {
    const res = await axios.get(usersShow(sub));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(usersIndex);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 自身のユーザ情報を取得
export const useMyUser = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = async (url: any) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR(userWhoami, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const postUsers = async (params: User, token: any) => {
  try {
    const res = await axios.post(usersIndex, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: User, token: any) => {
  try {
    // 0はURLをRailsに合わせるための念の為のダミーで、パラメータは使わず、自身の情報しか修正できないようにしている。
    await axios.put(usersShow('0'), params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
  } catch (error) {
    return error;
  }
};
