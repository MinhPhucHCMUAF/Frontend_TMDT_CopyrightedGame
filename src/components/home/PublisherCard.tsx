import { Link } from "react-router-dom";
export function PublisherCard({ publisher }: { publisher: any }) {
  return (
    <div className="card card-publish">
      <Link to="#" className="text-decoration-none text-dark">
        <div className="card-publish-content">
          <div className="publisher-icon">
            <img src={publisher.image} alt={publisher.name} />
          </div>
        </div>
      </Link>
    </div>
  );
}
