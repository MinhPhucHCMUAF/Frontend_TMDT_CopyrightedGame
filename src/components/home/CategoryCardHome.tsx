export function CategoryCardHome({
  categoryGames,
  gamesFilter,
  setGamesFilter,
}: any) {
  return (
    <div className="d-flex flex-wrap gap-3 ">
      {categoryGames.map((cate: any) => (
        <button
          key={cate.id}
          className={`btn ${gamesFilter === cate.id ? "btn-primary" : "btn-info"}`}
          onClick={() =>
            setGamesFilter(gamesFilter === cate.id ? null : cate.id)
          }
        >
          {cate.name}
        </button>
      ))}
    </div>
  );
}
