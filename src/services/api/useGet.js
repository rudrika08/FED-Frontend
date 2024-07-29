import { useState, useEffect } from "react";
import { api } from "../../services"; 

function useGet(apiUrl, errorMessage = "An error occurred") {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(apiUrl);

        if (isMounted) {
          if (response.status === 200) {
            setData(response.data);
            setError(null);
          } else {
            setError(errorMessage);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [apiUrl, errorMessage]);

  return { isLoading, data, error };
}

export default useGet;
