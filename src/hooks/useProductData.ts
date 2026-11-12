import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useProductData() {
  const [games, setGames] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [categoryGames, setCategoryGames] = useState([]);

  const [gamesFilter, setGamesFilter] = useState(null);
  const [pubFilter, setPubFilter] = useState(null);
  const [ratFilter, setRatFilter] = useState(null);

  useEffect(() => {
    const loadDataProduct = async () => {
      try {
        const resGames = await fetch(`${API_URL}/product-game`);
        const resPub = await fetch(`${API_URL}/publisher-game`);
        const resCategory = await fetch(`${API_URL}/category-game`);

        const dataGames = await resGames.json();
        const dataPub = await resPub.json();
        const dataCategory = await resCategory.json();

        setGames(dataGames);
        setPublisher(dataPub);
        setCategoryGames(dataCategory);
      } catch (err) {
        console.log(err);
      }
    };
    loadDataProduct();
  }, []);

  const filter = games.filter((val: any) => {
    const filterGame =
      gamesFilter === null
        ? games
        : Number(val.categoryID) === Number(gamesFilter);
    const filterPublisher =
      pubFilter === null
        ? games
        : Number(val.publisherID) === Number(pubFilter);
    return filterGame && filterPublisher;
  });

  return {
    publisher,
    categoryGames,
    gamesFilter,
    setGamesFilter,
    pubFilter,
    setPubFilter,
    filter,
  };
}
