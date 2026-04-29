import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = 'https://openlibrary.org';

export function useWorkDetail(workId) {
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`${BASE}/works/${workId}.json`)
      .then((res) => {
        setWork(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load book details.');
        setLoading(false);
      });
  }, [workId]);

  return { work, loading, error };
}