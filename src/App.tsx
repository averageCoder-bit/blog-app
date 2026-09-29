import Navbar from "./frontend/layout/Navbar";
import AppRoutes from "./frontend/routes/Routes";
import AppNavbar from "./frontend/components/AppNavbar";
import type { UserResponse } from "./frontend/validator/users";
import { useState } from "react";

type SortField = "date" | "title" | "likes" | "comments";
type SortOrder = "asc" | "desc";

function App() {
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortField>("date");
  const [order, setOrder] = useState<SortOrder>("desc");

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
        order={order}
        onOrderChange={setOrder}
      />

      <AppNavbar />

      <main>
        <AppRoutes
          currentUser={currentUser}
          search={search}
          category={category}
          sort={sort}
          order={order}
        />
      </main>
    </>
  );
}

export default App;
