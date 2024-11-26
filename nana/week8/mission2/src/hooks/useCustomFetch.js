import { useState } from "react";

export const useCustomFetch = (url, method = "GET") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (params = null, body = null) => {
    setLoading(true);
    setError(null);

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (body) options.body = JSON.stringify(body);

      const response = await fetch(`http://localhost:3000${url}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
