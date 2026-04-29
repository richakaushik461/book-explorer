import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BASE = 'https://openlibrary.org';

export function useBookSearch(query, page = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setData(null);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setHasSearched(true);

    axios
      .get(`${BASE}/search.json`, {
        params: {
          q: query,
          page,
          limit: 20,
          fields: 'key,title,author_name,cover_i,subject,first_publish_year',
        },
        signal: abortControllerRef.current.signal,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          // Request was cancelled, ignore
          return;
        }
        setError(
          err.message === 'Network Error'
            ? 'Network error. Check your connection.'
            : 'Something went wrong. Please try again.'
        );
        setLoading(false);
      });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, page]);

  return { data, loading, error, hasSearched };
}