import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

// sd cho trang chủ
export function useHomeData() {
  const [games, setGames] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [categoryGames, setCategoryGames] = useState([]);
  const [gamesFilter, setGamesFilter] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const resGames = await fetch(`${API_URL}/product-game`);
        const resCategory = await fetch(`${API_URL}/category-game`);
        const resPublisher = await fetch(`${API_URL}/publisher-game`);
        const resVoucher = await fetch(`${API_URL}/vouchers`);

        const dataGames = await resGames.json();
        const dataCategory = await resCategory.json();
        const dataPublisher = await resPublisher.json();
        const dataVoucher = await resVoucher.json();

        setGames(dataGames);
        setCategoryGames(dataCategory);
        setPublisher(dataPublisher);
        setVoucher(dataVoucher);
      } catch (err) {
        console.log(err);
      }
    };
    loadGame();
  }, []);
  const filter =
    gamesFilter === null
      ? games
      : games.filter((f: any) => Number(f.categoryID) === Number(gamesFilter));
  return {
    games,
    publisher,
    voucher,
    categoryGames,
    gamesFilter,
    setGamesFilter,
    filter,
  };
}
// sd cho trang khác
