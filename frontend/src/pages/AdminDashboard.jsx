import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setError("");

      const [eventResponse, feedbackResponse] = await Promise.all([
        axios.get(`${API_URL}/events`),
        axios.get(`${API_URL}/feedback`),
      ]);

      setEvents(eventResponse.data);
      setFeedback(feedbackResponse.data);
    } catch {
      setError("Unable to load dashboard data. Check the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const averageRating =
    feedback.length > 0
      ? (
          feedback.reduce((total, item) => total + item.rating, 0) /
          feedback.length
        ).toFixed(1)
      : "0.0";

  async function deleteEvent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/events/${id}`);
      await loadData();
    } catch {
      setError("Unable to delete event.");
    }
  }

  if (loading) {
    return <p className="status-message">Loading dashboard...</p>;
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <p className="badge">MANAGEMENT OVERVIEW</p>
        <h1>Admin Dashboard</h1>
        <p>View events and analyze student feedback.</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <span>📅</span>
          <p>Total Events</p>
          <h2>{events.length}</h2>
        </div>

        <div className="stat-card">
          <span>💬</span>
          <p>Total Feedback</p>
          <h2>{feedback.length}</h2>
        </div>

        <div className="stat-card">
          <span>⭐</span>
          <p>Average Rating</p>
          <h2>{averageRating}/5</h2>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Manage Events</h2>

        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>
                      {new Date(event.date).toLocaleDateString("en-IN")}
                    </td>
                    <td>{event.venue}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Recent Feedback</h2>

        {feedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-list">
            {feedback.map((item) => (
              <article className="feedback-card" key={item._id}>
                <div className="feedback-card-header">
                  <h3>{item.studentName}</h3>
                  <span className="rating-display">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </span>
                </div>

                <p className="feedback-event">
                  Event: {item.event?.title || "Event unavailable"}
                </p>

                <p>{item.comments}</p>

                <small>
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </small>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
