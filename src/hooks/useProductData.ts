import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useProductData() {
  const [games, setGames] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any[]>([]);
  const [categoryGames, setCategoryGames] = useState<any[]>([]);
  const [keyword, setKeyWord] = useState("");

  const [gamesFilter, setGamesFilter] = useState(null);
  const [pubFilter, setPubFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(1500000);

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
    const filterPrice = Number(val.price) < priceFilter;
    const filterSearch =
      keyword.trim() === ""
        ? games
        : val.title.toLowerCase().includes(keyword.toLowerCase());
    return filterGame && filterPublisher && filterPrice && filterSearch;
  });
  const getGamebyID = (id: number) => {
    return games.find((g) => Number(g.id) === id);
  };
  const getPublisherName = (id: number) => {
    return publisher.find((pub) => Number(pub.id) === id)?.name;
  };
  const getCategoryGames = (id: number) => {
    return categoryGames.find((cat) => Number(cat.id) === id)?.name;
  };
  const removeData = () => {
    setGamesFilter(null);
    setPubFilter(null);
    setPriceFilter(1500000);
  };

  return {
    games,
    publisher,
    categoryGames,
    gamesFilter,
    setGamesFilter,
    pubFilter,
    setPubFilter,
    filter,
    setPriceFilter,
    priceFilter,
    removeData,
    keyword,
    setKeyWord,
    getGamebyID,
    getPublisherName,
    getCategoryGames,
  };
}
