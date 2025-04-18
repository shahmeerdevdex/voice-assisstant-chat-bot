# Voiza Widget - Documentation

## 📚 Voiza Widget Documentation

The **Voiza Widget** is a customizable AI chat widget that allows users to interact with an AI agent through voice and text messages. You can integrate this widget into various platforms, including React, Next.js, and vanilla HTML.

---

## 🎨 Features

- **Voice and Text** interactions with AI.
- Customizable **theme** (light/dark mode).
- Floating widget button that triggers the chat popup.
- Easily embeddable in web applications via CDN or local build.

---

## 📦 Installation

### CDN (For all platforms)

1. **Add the Widget to Your HTML Page**

   Simply include the widget's script in your HTML file and add css in the head.

   ```html
   <head>
     <link rel="stylesheet" href="https://voiza.netlify.app/voiza-widget.css" />
   </head>
   <div id="voiza-widget"></div>

   <script>
     window.voizaConfig = {
       agentId: "YOUR_AGENT_ID", // Replace with your agent ID
       theme: "dark", // Optional: "light" or "dark"
     };
   </script>

   <script src="https://voiza.netlify.app/voiza-widget.iife.js"></script>
   <script>
     Voiza.mount(); // Mount the widget to the page
   </script>
   ```

## 📦 Dependencies

- **Tailwind CSS**: Used for styling.
- **React**: For building the UI.
- **Radix UI**: For modal and dialog management.
- **Lucide Icons**: For icons.
