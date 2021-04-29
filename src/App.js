import './App.css';

import MainPage from "./pages/main.js";
import ProjectsPage from "./pages/project.js";
import AboutPage from "./pages/about.js";
import ContactPage from "./pages/contact.js";

function App() {
  return (
    <div className="App">
      <MainPage />
      <ProjectsPage />
      <AboutPage />
      <ContactPage />
    </div>
  );
}

export default App;