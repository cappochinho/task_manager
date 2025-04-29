import { RouterProvider } from "react-router-dom";
import { router } from "../src/router";
import { AuthProvider } from "../src/contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
