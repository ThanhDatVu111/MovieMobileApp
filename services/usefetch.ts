import { useState, useEffect } from "react";

//<T> is a generic type parameter — it’s a placeholder for any data type that you will specify when you use the hook.
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  //data can be of type T or null, loading is a boolean, and error is either an Error object or null.
  const [data, setData] = useState<T | null>(null); //before fetching data, data is null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); //error is null before fetching data

  useEffect(() => {
    if (autoFetch) {
      fetchData(); // Called once when the component mounts
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction(); //fetchFunction is either , fetchMovies or fetchMovieDetails
      setData(result); 
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;