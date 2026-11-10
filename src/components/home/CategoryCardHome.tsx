export function CategoryCardHome({
  categoryGames,
  gamesFilter,
  setGamesFilter,
}: any) {
  return (
    <div className="d-flex flex-wrap gap-3 ">
      <button
        className={`btn ${gamesFilter === null ? "btn-primary" : "btn-info"}`}
        onClick={() => setGamesFilter(null)}
      >
        Tất cả
      </button>

      {categoryGames.map((cate: any) => (
        <button
          key={cate.id}
          className={`btn ${gamesFilter === cate.id ? "btn-primary" : "btn-info"}`}
          onClick={() => setGamesFilter(cate.id)}
        >
          {cate.name}
        </button>
      ))}
    </div>
  );
}
