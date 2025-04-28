function construirCorreoToken(email, token, esReenvio = false) {
  const asunto = esReenvio
    ? "Reenvío del código de acceso - HostDime"
    : "Tu código de acceso - HostDime";

  const html = esReenvio
    ? `<p>Tu código sigue siendo: <strong>${token}</strong>. Tiene validez restante.</p>`
    : `<p>Tu código de acceso es: <strong>${token}</strong>. Tiene una validez de 10 minutos.</p>`;

  return {
    transporter: "hostdime.com.co",
    from: "notifications@hostdime.com.co",
    to: email,
    subject: asunto,
    html: html,
    replyTo: "transactional@hostdime.com.co"
  };
}

module.exports = { construirCorreoToken };
