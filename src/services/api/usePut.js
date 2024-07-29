import { useState, useEffect } from "react";
import { api } from "../../services";

function usePut(
  apiUrl,
  body,
  headers = {},
  successMessage = "Request successful",
  errorMessage = "An error occurred"
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const putData = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(apiUrl, body, { headers });

      if (response.status === 200 || response.status === 204) {
        setData(response.data);
        setError(null);
        setSuccess(successMessage);
      } else {
        setError(errorMessage);
        setSuccess(null);
      }
    } catch (error) {
      setError(errorMessage);
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (trigger) {
      putData();
      // Reset trigger after the request is initiated
      setTrigger(false);
    }
  }, [trigger]);

  return { isLoading, data, error, success, setTrigger };
}

export default usePut;
