import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useNewsData() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const loadGame = async () => {
      try {
        const resNews = await fetch(`${API_URL}/news`);
        const dataNews = await resNews.json();
        setNews(dataNews);
      } catch (err) {
        console.log(err);
      }
    };
    loadGame();
  }, []);
  return { news };
}
