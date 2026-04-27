import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY!);

interface ContactEmail {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(data: ContactEmail) {
  const toEmails = (process.env.CONTACT_TO_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim());

  await sgMail.send({
    to: toEmails,
    from: process.env.CONTACT_FROM_EMAIL!,
    replyTo: data.email,
    subject: `[Grupo ZER Web] ${esc(data.subject)} — ${esc(data.name)}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "N/A"}\nSubject: ${data.subject}\n\n${data.message}`,
    html: `
      <h2>New contact from zergrupo.com</h2>
      <p><strong>Name:</strong> ${esc(data.name)}</p>
      <p><strong>Email:</strong> ${esc(data.email)}</p>
      <p><strong>Company:</strong> ${esc(data.company ?? "N/A")}</p>
      <p><strong>Subject:</strong> ${esc(data.subject)}</p>
      <hr/>
      <p>${esc(data.message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}
