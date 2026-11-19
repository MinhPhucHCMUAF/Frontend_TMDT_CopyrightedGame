import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useFaqData() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaq = async () => {
      try {
        const resFaqs = await fetch(`${API_URL}/faqs`);
        const dataFaqs = await resFaqs.json();
        setFaqs(dataFaqs);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    loadFaq();
  }, []);

  return { faqs, loading };
}
