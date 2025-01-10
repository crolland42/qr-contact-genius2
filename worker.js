export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Gérer les requêtes CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Gérer les requêtes OPTIONS (pre-flight)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    try {
      // Essayer de servir le fichier statique depuis l'asset manifest
      let response = await env.ASSETS.fetch(request);
      
      // Si c'est une route d'API
      if (url.pathname.startsWith('/api')) {
        return handleApiRequest(request);
      }
      
      // Pour toutes les autres routes, on sert index.html pour le routage côté client
      if (!response.ok && response.status === 404) {
        response = await env.ASSETS.fetch(`${url.origin}/index.html`);
      }

      // Ajouter les headers CORS à la réponse
      const newHeaders = new Headers(response.headers);
      Object.keys(corsHeaders).forEach(key => {
        newHeaders.set(key, corsHeaders[key]);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });

    } catch (e) {
      return new Response('Error: ' + e.message, { 
        status: 500,
        headers: corsHeaders
      });
    }
  }
};

async function handleApiRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return new Response(JSON.stringify({ message: "API response" }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
