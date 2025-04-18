import ReactDOM from "react-dom/client";
import { FloatingWidget } from "./components/FloatingWidget";
import "./index.css";

// Mount function for global exposure
function mount() {
  const container = document.getElementById("voiza-widget");
  if (!container) {
    console.warn("Voiza: container #voiza-widget not found.");
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(<FloatingWidget />);
}

// Expose on window for CDN users
(window as any).Voiza = {
  mount,
};
