import Navbar from "./frontend/layout/Navbar";
import AppRoutes from "./frontend/routes/Routes";
import AppNavbar from "./frontend/components/AppNavbar";
import type { UserResponse } from "./frontend/validator/users";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "title">("newest");

  return (
    <>
      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      <AppNavbar />

      <main>
        <AppRoutes
          currentUser={currentUser}
          search={search}
          category={category}
          sort={sort}
        />
      </main>
    </>
  );
}

export default App;
