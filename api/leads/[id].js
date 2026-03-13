const {
  handleUpdateLead,
  methodNotAllowed,
} = require("../../lib/leads-api");

module.exports = async function leadByIdHandler(request, response) {
  if (request.method !== "PATCH") {
    methodNotAllowed(response, ["PATCH"]);
    return;
  }

  const leadId = Array.isArray(request.query?.id)
    ? request.query.id[0]
    : request.query?.id;

  await handleUpdateLead(request, response, leadId);
};
