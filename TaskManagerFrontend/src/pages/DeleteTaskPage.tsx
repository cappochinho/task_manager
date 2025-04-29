import { useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';

export const DeleteTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/taskitems/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "32px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"
    }}>
      <h2 style={{
        color: "#d32f2f",
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "16px"
      }}>
        Delete Task
      </h2>
      
      <div style={{
        margin: "24px 0",
        fontSize: "16px",
        lineHeight: "1.5",
        color: "#333"
      }}>
        <p style={{ marginBottom: "8px" }}>Are you sure you want to delete this task?</p>
        <p style={{ 
          color: "#666",
          fontSize: "14px",
          fontStyle: "italic"
        }}>
          This action cannot be undone.
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        marginTop: "32px"
      }}>
        <button
          onClick={handleDelete}
          style={{
            padding: "12px 24px",
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            minWidth: "160px",
            transition: "background-color 0.2s ease"
          }}
        >
          Delete
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: "12px 24px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            minWidth: "160px",
            transition: "background-color 0.2s ease"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};