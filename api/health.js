const {
  isSupabaseConfigured,
  methodNotAllowed,
  sendJson,
} = require("../lib/leads-api");

module.exports = async function healthHandler(request, response) {
  if (request.method !== "GET") {
    methodNotAllowed(response, ["GET"]);
    return;
  }

  sendJson(response, 200, {
    ok: true,
    supabaseConfigured: isSupabaseConfigured(),
  });
};
