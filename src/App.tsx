import "./App.css";
import Navbar from "./frontend/components/Navbar";
import Blogs from "./frontend/pages/Blogs";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Blogs />
      </main>
    </>
  );
}

export default App;
