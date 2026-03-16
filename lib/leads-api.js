function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(payload);
}

async function readJsonBody(request) {
  if (request.body !== undefined) {
    if (typeof request.body === "string") {
      return request.body ? JSON.parse(request.body) : {};
    }

    if (Buffer.isBuffer(request.body)) {
      const rawBody = request.body.toString("utf8");
      return rawBody ? JSON.parse(rawBody) : {};
    }

    if (request.body && typeof request.body === "object") {
      return request.body;
    }
  }

  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
}

function getLeadsTableName() {
  return process.env.SUPABASE_TABLE || process.env.SUPABASE_LEADS_TABLE || "LEADS";
}

async function callSupabase(method, endpoint, payload) {
  if (!isSupabaseConfigured()) {
    throw new Error("supabase_not_configured");
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${endpoint}`, {
    method,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `supabase_${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function handleCreateLead(request, response) {
  let body;

  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, 400, { error: "Corpo JSON inválido." });
    return;
  }

  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const country = String(body.country || "").trim();
  const company = String(body.company || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const jobTitle = String(body.jobTitle || "").trim();
  const areaCode = String(body.areaCode || "").trim();
  const phoneNumber = String(body.phoneNumber || "").trim();

  if (!firstName || !lastName || !country || !company || !email || !areaCode || !phoneNumber) {
    sendJson(response, 400, { error: "Campos obrigatórios ausentes." });
    return;
  }

  try {
    const rows = await callSupabase("POST", getLeadsTableName(), [
      {
        first_name: firstName,
        last_name: lastName,
        country,
        company,
        phone_number: phoneNumber,
        email,
        job_title: jobTitle || null,
        area_code: areaCode,
      },
    ]);

    const createdLead = Array.isArray(rows) ? rows[0] : null;

    if (!createdLead?.id) {
      throw new Error("missing_lead_id");
    }

    sendJson(response, 201, {
      id: createdLead.id,
    });
  } catch (error) {
    console.error("Failed to create lead in Supabase:", error.message);
    sendJson(response, 502, {
      error: "Não foi possível salvar o lead no Supabase.",
      detail: error.message,
    });
  }
}

async function handleUpdateLead(request, response, leadId) {
  sendJson(response, 200, { id: leadId || null, updated: false });
}

function methodNotAllowed(response, allowedMethods) {
  response.setHeader("Allow", allowedMethods.join(", "));
  sendText(response, 405, "Method Not Allowed");
}

module.exports = {
  handleCreateLead,
  handleUpdateLead,
  isSupabaseConfigured,
  methodNotAllowed,
  sendJson,
  sendText,
};
