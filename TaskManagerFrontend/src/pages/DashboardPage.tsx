import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { Link } from "react-router-dom";

interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}

export const DashboardPage = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/taskitems");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const getStatusColor = (status: TaskItem["status"]) => {
    switch(status) {
      case "Completed": return "#4CAF50";
      case "In Progress": return "#FFC107";
      case "Pending": return "#9E9E9E";
      default: return "#2196F3";
    }
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <h2 style={{ margin: 0, fontSize: "28px", color: "#333" }}>Task Dashboard</h2>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link
            to="/create"
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>+</span> Create New Task
          </Link>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "500",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          color: "#666"
        }}>
          No tasks found. Create your first task!
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px"
        }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "20px",
                borderLeft: `4px solid ${getStatusColor(task.status)}`,
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "18px",
                  color: "#333",
                  fontWeight: "600"
                }}>
                  {task.title}
                </h3>
                <span style={{
                  padding: "4px 8px",
                  backgroundColor: getStatusColor(task.status),
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  {task.status}
                </span>
              </div>
              
              {task.description && (
                <p style={{ 
                  margin: 0, 
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}>
                  {task.description}
                </p>
              )}
              
              <div style={{ 
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ 
                  color: "#666",
                  fontSize: "13px",
                  fontWeight: "500"
                }}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    to={`/edit/${task.id}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: "500"
                    }}
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/delete/${task.id}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: "500"
                    }}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};