export function GameCard({ gameCards }: { gameCards: any }) {
  return (
    <div className="card bg-dark">
      <div className="card-body ">
        <h5 className="card-title">{gameCards.title}</h5>
        <p className="card-text">{gameCards.description}</p>
      </div>
    </div>
  );
}
