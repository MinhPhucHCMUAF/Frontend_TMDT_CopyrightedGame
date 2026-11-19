import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function usePolicyData(policyId: string) {
  const [policy, setPolicy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicy = async () => {
      setLoading(true);
      try {
        const resPolicy = await fetch(`${API_URL}/policies/${policyId}`);
        if (resPolicy.ok) {
          const dataPolicy = await resPolicy.json();
          setPolicy(dataPolicy);
        } else {
          setPolicy(null);
        }
      } catch (err) {
        console.log(err);
        setPolicy(null);
      }
      setLoading(false);
    };
    loadPolicy();
  }, [policyId]);

  return { policy, loading };
}
