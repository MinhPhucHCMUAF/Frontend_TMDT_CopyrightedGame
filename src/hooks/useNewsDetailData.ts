import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useNewsDetailData(id: any) {
  const [news, setNews] = useState<any>(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const resNews = await fetch(`${API_URL}/news/${id}`);
        if (resNews.ok) {
          const dataNews = await resNews.json();
          const resRelated = await fetch(`${API_URL}/news?category=${dataNews.category}`);
          const dataRelated = await resRelated.json();
          setNews(dataNews);
          setRelated(dataRelated.filter((n: any) => n.id != id).slice(0, 3));
          window.scrollTo(0, 0);
        } else {
          setNews(null);
        }
      } catch (err) {
        console.log(err);
        setNews(null);
      }
      setLoading(false);
    };
    loadNews();
  }, [id]);

  return { news, related, loading };
}
