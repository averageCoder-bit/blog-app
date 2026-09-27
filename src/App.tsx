import Navbar from "./frontend/layout/Navbar";
import AppRoutes from "./frontend/routes/Routes";
import AppNavbar from "./frontend/components/AppNavbar";
import type { UserResponse } from "./frontend/validator/users";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <AppNavbar />

      <main>
        <AppRoutes currentUser={currentUser} />
      </main>
    </>
  );
}

export default App;
