import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

export const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">("In Progress");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/taskitems", { title, description, dueDate, status });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{
        marginBottom: "24px",
        color: "#333",
        fontSize: "28px",
        fontWeight: "600"
      }}>
        Create New Task
      </h2>
      
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#444"
          }}>
            Title *
          </label>
          <input
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#444"
          }}>
            Description
          </label>
          <input
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#444"
          }}>
            Due Date *
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#444"
          }}>
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              backgroundColor: "white",
              cursor: "pointer"
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px"
        }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              flex: 1
            }}
          >
            Create Task
          </button>
          <button
            type="button"
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
              flex: 1
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};