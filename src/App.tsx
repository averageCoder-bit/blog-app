import Navbar from "./frontend/layout/Navbar";
import AppRoutes from "./frontend/routes/Routes";
import AppNavbar from "./frontend/components/AppNavbar";

function App() {
  return (
    <>
      <Navbar />
      <AppNavbar />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
