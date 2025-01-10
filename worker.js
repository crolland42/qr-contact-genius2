addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
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

  try {
    // Si c'est une route d'API
    if (url.pathname.startsWith('/api')) {
      return handleApiRequest(request)
    }

    // Laisser le site statique gérer toutes les autres requêtes
    return fetch(request)

  } catch (e) {
    return new Response('Error: ' + e.message, { 
      status: 500,
      headers: corsHeaders
    })
  }
}

async function handleApiRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  return new Response(JSON.stringify({ message: "API response" }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  })
}
