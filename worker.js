export default {
    async fetch(request) {
      const url = new URL(request.url);
  
      // Exemples de logique pour gérer les routes
      if (url.pathname === "/") {
        return new Response("Bienvenue sur QR Contact Genius!", {
          headers: { "Content-Type": "text/plain" },
        });
      }
  
      if (url.pathname.startsWith("/api")) {
        return new Response(JSON.stringify({ message: "API response" }), {
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response("Page non trouvée", { status: 404 });
    },
  };
  