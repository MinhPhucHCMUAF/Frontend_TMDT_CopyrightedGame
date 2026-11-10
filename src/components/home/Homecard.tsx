export function Homecard({ game }: { game: any }) {
  return (
    <div className="col">
      <div className="card">
        <img src={game.image} className="card-img-top" alt={game.title} />
        <div className="card-body">
          <h5 className="card-title">{game.title}</h5>
          <p className="card-text">{game.summary}</p>
          <a href="#" className="btn btn-primary">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
}
