import { useState, useCallback } from 'react';
import api from '../services/api.js';
import { REQUEST_STATUS, ERROR_MESSAGES } from '../constants/apiConstants.js';

export const useApi = () => {
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (request) => {
    try {
      setStatus(REQUEST_STATUS.LOADING);
      setError(null);

      const response = await request();
      
      setData(response.data || response);
      setStatus(REQUEST_STATUS.SUCCESS);
      return response;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      setStatus(REQUEST_STATUS.ERROR);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus(REQUEST_STATUS.IDLE);
    setData(null);
    setError(null);
  }, []);

  return {
    status,
    data,
    error,
    execute,
    reset,
    isLoading: status === REQUEST_STATUS.LOADING,
    isError: status === REQUEST_STATUS.ERROR,
    isSuccess: status === REQUEST_STATUS.SUCCESS,
  };
};

export const useFetch = (endpoint, options = {}) => {
  const apiHook = useApi();
  const [retryCount, setRetryCount] = useState(0);

  const fetch = useCallback(async () => {
    return apiHook.execute(() => api.get(endpoint, options));
  }, [endpoint, options, apiHook]);

  const retry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      return fetch();
    }
  }, [retryCount, fetch]);

  return {
    ...apiHook,
    fetch,
    retry,
    retryCount,
  };
};

export const usePost = () => {
  const apiHook = useApi();

  const post = useCallback((endpoint, payload) => {
    return apiHook.execute(() => api.post(endpoint, payload));
  }, [apiHook]);

  return {
    ...apiHook,
    post,
  };
};

export const usePut = () => {
  const apiHook = useApi();

  const put = useCallback((endpoint, payload) => {
    return apiHook.execute(() => api.put(endpoint, payload));
  }, [apiHook]);

  return {
    ...apiHook,
    put,
  };
};

export const useDelete = () => {
  const apiHook = useApi();

  const deleteResource = useCallback((endpoint) => {
    return apiHook.execute(() => api.delete(endpoint));
  }, [apiHook]);

  return {
    ...apiHook,
    delete: deleteResource,
  };
};

export default useApi;
