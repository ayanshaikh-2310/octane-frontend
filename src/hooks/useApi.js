import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.get(url);

        console.log("API RAW RESPONSE 👉", res.data);

        if (mounted) {
          // ✅ YOUR BACKEND FORMAT
          setData(res.data.result || []);
        }
      } catch (err) {
        console.log("API ERROR 👉", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
