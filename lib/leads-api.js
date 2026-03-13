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

  const name = String(body.name || "").trim();
  const phoneNumber = String(body.phoneNumber || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const reason = String(body.reason || "").trim();
  const prize = Boolean(body.prize);

  if (!name || !phoneNumber || !email || !reason) {
    sendJson(response, 400, { error: "Campos obrigatórios ausentes." });
    return;
  }

  try {
    const rows = await callSupabase("POST", "LEADS", [
      {
        name,
        phone_number: phoneNumber,
        email,
        reason,
        prize,
      },
    ]);

    const createdLead = Array.isArray(rows) ? rows[0] : null;

    if (!createdLead?.id) {
      throw new Error("missing_lead_id");
    }

    sendJson(response, 201, {
      id: createdLead.id,
      prize: Boolean(createdLead.prize),
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
  if (!leadId) {
    sendJson(response, 400, { error: "Lead inválido." });
    return;
  }

  let body;

  try {
    body = await readJsonBody(request);
  } catch (error) {
    sendJson(response, 400, { error: "Corpo JSON inválido." });
    return;
  }

  if (typeof body.prize !== "boolean") {
    sendJson(response, 400, { error: "O campo prize deve ser boolean." });
    return;
  }

  try {
    const rows = await callSupabase(
      "PATCH",
      `LEADS?id=eq.${encodeURIComponent(leadId)}`,
      {
        prize: body.prize,
      },
    );

    const updatedLead = Array.isArray(rows) ? rows[0] : null;
    sendJson(response, 200, {
      id: updatedLead?.id || leadId,
      prize: Boolean(updatedLead?.prize ?? body.prize),
    });
  } catch (error) {
    console.error("Failed to update lead in Supabase:", error.message);
    sendJson(response, 502, {
      error: "Não foi possível atualizar o lead no Supabase.",
      detail: error.message,
    });
  }
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
