import { useState, useEffect } from 'react';

const useUnixTimestamp = (dateString) => {
  const [unixTimestamp, setUnixTimestamp] = useState(null);

  useEffect(() => {
    const convertToUnixTimestamp = (dateString) => {
      const date = new Date(dateString);
      return Math.floor(date.getTime() / 1000);
    };

    if (dateString) {
      const timestamp = convertToUnixTimestamp(dateString);
      setUnixTimestamp(timestamp);
    }
  }, [dateString]);

  return unixTimestamp;
};

export default useUnixTimestamp;
