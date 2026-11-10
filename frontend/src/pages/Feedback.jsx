import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Feedback() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then((response) => {
        const selectedEvent = response.data.find(
          (item) => item._id === eventId
        );

        setEvent(selectedEvent || null);
      })
      .catch(() => {
        setError("Unable to load event details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await axios.post(`${API_URL}/feedback`, {
        event: eventId,
        studentName,
        rating,
        comments,
      });

      setMessage("Feedback submitted successfully!");

      setTimeout(() => {
        navigate("/events");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit feedback. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="status-message">Loading event...</p>;
  }

  if (!event) {
    return (
      <div className="empty-state">
        <h2>Event not found</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="form-page">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <p className="badge">YOUR OPINION MATTERS</p>
        <h1>Event Feedback</h1>
        <p className="selected-event">{event.title}</p>

        <label htmlFor="studentName">Student Name</label>
        <input
          id="studentName"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Rate Your Experience</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={star <= rating ? "star active" : "star"}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} out of 5`}
              aria-pressed={rating === star}
            >
              ★
            </button>
          ))}
        </div>

        <p className="rating-label">{rating} out of 5 stars</p>

        <label htmlFor="comments">Your Feedback</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Tell us about your experience..."
          rows="5"
          required
        />

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="primary-btn submit-btn"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default Feedback;
