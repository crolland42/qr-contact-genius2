export default {
  async fetch(request, env, ctx) {
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
      // Si c'est une route d'API
      if (url.pathname.startsWith('/api')) {
        return handleApiRequest(request);
      }

      // Essayer de servir le fichier statique
      const asset = await env.__STATIC_CONTENT.get(url.pathname.slice(1));
      
      if (asset) {
        const headers = new Headers(corsHeaders);
        if (url.pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript');
        } else if (url.pathname.endsWith('.css')) {
          headers.set('Content-Type', 'text/css');
        } else if (url.pathname.endsWith('.html')) {
          headers.set('Content-Type', 'text/html');
        }
        return new Response(asset.body, { headers });
      }

      // Pour toutes les autres routes, servir index.html
      const indexHtml = await env.__STATIC_CONTENT.get('index.html');
      if (indexHtml) {
        const headers = new Headers(corsHeaders);
        headers.set('Content-Type', 'text/html');
        return new Response(indexHtml.body, { headers });
      }

      return new Response('Not Found', { 
        status: 404,
        headers: corsHeaders
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
