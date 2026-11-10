import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch(() => {
        setError("Unable to load events. Please check the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="status-message">Loading events...</p>;
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="badge">DISCOVER & PARTICIPATE</p>
        <h1>College Events</h1>
        <p>Explore events and share your valuable feedback.</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && events.length === 0 && (
        <div className="empty-state">
          <h2>No events available yet</h2>
          <p>Events added to the database will appear here.</p>
        </div>
      )}

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <div className="event-icon">📅</div>

            <span className="event-category">
              {event.category || "General"}
            </span>

            <h2>{event.title}</h2>
            <p>{event.description}</p>

            <div className="event-details">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString("en-IN")}
              </p>

              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>

            <Link
              to={`/feedback/${event._id}`}
              className="primary-btn"
            >
              Give Feedback →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
