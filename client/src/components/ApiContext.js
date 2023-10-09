// ApiContext.js

import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeApiRequest = async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // You can add more headers as needed (e.g., authentication headers).
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return (
    <ApiContext.Provider value={{ makeApiRequest, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
