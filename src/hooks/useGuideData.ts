import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useGuideData() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuide = async () => {
      try {
        const resGuides = await fetch(`${API_URL}/guides`);
        const dataGuides = await resGuides.json();
        setGuides(dataGuides);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    loadGuide();
  }, []);

  return { guides, loading };
}
