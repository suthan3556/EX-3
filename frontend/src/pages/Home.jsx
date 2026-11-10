import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <p className="badge">COLLEGE EVENT MANAGEMENT</p>

        <h1>
          Your Feedback Makes
          <br />
          Every Event <span>Better.</span>
        </h1>

        <p className="hero-description">
          Share your experience, rate college events, and help us
          make future workshops, seminars, and programs even better.
        </p>

        <Link to="/events" className="primary-btn">
          Explore Events →
        </Link>
      </div>

      <div className="hero-card">
        <div className="hero-icon">🎓</div>
        <h2>Every Voice Matters</h2>
        <p>
          Your feedback helps organizers understand what went well
          and what can be improved.
        </p>

        <div className="rating-display">★★★★★</div>
        <small>Rate your experience out of 5</small>
      </div>
    </div>
  );
}

export default Home;
