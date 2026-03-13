const {
  handleCreateLead,
  methodNotAllowed,
} = require("../../lib/leads-api");

module.exports = async function leadsHandler(request, response) {
  if (request.method !== "POST") {
    methodNotAllowed(response, ["POST"]);
    return;
  }

  await handleCreateLead(request, response);
};
