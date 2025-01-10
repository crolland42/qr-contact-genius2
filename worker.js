addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Vérifier si la requête est pour l'API
  const url = new URL(request.url)
  
  // Gérer les requêtes CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Gérer les requêtes OPTIONS (pre-flight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  // Exemples de logique pour gérer les routes
  if (url.pathname === "/") {
    return new Response("Bienvenue sur QR Contact Genius!", {
      headers: {
        "Content-Type": "text/plain",
        ...corsHeaders
      }
    });
  }

  if (url.pathname.startsWith("/api")) {
    return new Response(JSON.stringify({ message: "API response" }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }

  return new Response("Page non trouvée", { 
    status: 404,
    headers: corsHeaders
  });
}
