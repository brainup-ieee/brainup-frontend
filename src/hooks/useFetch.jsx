import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const useGet = (url, headers) => {
  return useQuery(url, async () => {
    return await axios.get(url, { headers }).then((res) => res.data);
  });
};

export const usePost = (url, headers, body) => {
  return useQuery(url, async () => {
    return await axios.post(url, body, { headers }).then((res) => res.data);
  });
};

export const useGetMutate = (url, headers) => {
  return useMutation(async () => {
    return await axios.get(url, { headers }).then((res) => res.data);
  });
};

export const usePostMutate = (url, headers, body) => {
  return useMutation(async () => {
    return await axios.post(url, body, { headers }).then((res) => res.data);
  });
};

export const usePostVarify = (url, body) => {
  return useMutation(async () => {
    return await axios.post(url, body).then((res) => res.data);
  });
};
