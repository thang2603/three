import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();

      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }

      return () => {
        // Hủy bỏ request khi component unmount
        source.cancel("Request canceled due to component unmount");
      };
    };

    fetchData();

    // Cleanup function to cancel the request if the component unmounts or the URL changes
    return () => {
      // Hủy bỏ request khi component unmount hoặc URL thay đổi
      fetchData.cancel();
    };
  }, [url]); // Thay đổi URL sẽ gọi lại effect và hủy bỏ request cũ

  return { data, error, loading };
};

export default useAxios;
