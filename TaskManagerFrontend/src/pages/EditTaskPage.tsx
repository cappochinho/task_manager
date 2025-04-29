import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';

type TaskStatus = "Pending" | "In Progress" | "Completed";

export const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("In Progress");

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await api.get(`/taskitems/${id}`);
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split('T')[0]);
        setStatus(task.status);
      } catch (error) {
        console.error("Error fetching task:", error);
        navigate("/dashboard");
      }
    }
    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/taskitems/${id}`, { id, title, description, dueDate, status });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
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
        fontWeight: "600",
        borderBottom: "1px solid #eee",
        paddingBottom: "12px"
      }}>
        Edit Task
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
              minHeight: "100px"
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
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
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
          marginTop: "24px"
        }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              flex: 1
            }}
          >
            Save Changes
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