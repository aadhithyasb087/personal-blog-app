import axios from "axios";
import { useState, useEffect } from "react";
function useFetchData(apiEndPoint) {

  const [allData, setAllData] = useState("");

  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() =>
  {
    if (initialLoading) {
      setLoading(false);
      setInitialLoading(false);
      return;
    }
    setLoading(true);

    const fecthAllData = async () => {
      try {
        const uri = `${process.env.REACT_APP_API_URI}/getblogs${apiEndPoint}`;
        const res = await axios.get(uri);
        const data = res.data;

        setAllData(data);

        setLoading(false);
      } catch (err) {
        console.log("Error getting data", err);
        setLoading(false);
      }
    };

    if (apiEndPoint) {
      fecthAllData();
    }
  }, [apiEndPoint,initialLoading]);
  return { allData, loading };
}

export default useFetchData;
