const SITE_URL = 'https://brockleyfields.com'
const LOGO_URL = `${SITE_URL}/brand/brockley-fields-logo.png`
const FROM = 'Brockley Fields Studios <carey@careywilletts.com>'
const REPLY_TO = 'hello@brockleyfields.com'
const SUBJECT = "You're on the Brockley Fields waiting list"
const REQUEST_TIMEOUT_MS = 10_000

const CREAM = '#f8efde'
const INK = '#3a3a38'
const GREEN = '#6c903c'
const HEADING_FONT = "'Archivo', Arial, Helvetica, sans-serif"
const BODY_FONT = "'Work Sans', Arial, Helvetica, sans-serif"

const PARAGRAPHS = [
  'Thanks for getting in touch – you’re on the list.',
  'Rooms at Brockley Fields don’t come up often, and when one does I like to meet people properly before anything else. So when something opens that suits what you’re after, I’ll get in touch and we can arrange for you to come and see it.',
  'In the meantime, if anything changes or you want to tell me more about what you’re working on, just reply to this email.',
]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function firstNameOf(name: string) {
  return name.trim().split(/\s+/)[0] || 'there'
}

export function renderConfirmationText(firstName: string) {
  return [
    `Hi ${firstName},`,
    '',
    ...PARAGRAPHS.flatMap((paragraph) => [paragraph, '']),
    'Carey',
    'Brockley Fields Studios, SE4',
    '',
    '—',
    'brockleyfields.com · @brockleyfields · hello@brockleyfields.com',
  ].join('\n')
}

export function renderConfirmationHtml(firstName: string) {
  const name = escapeHtml(firstName)
  const paragraphStyle = `margin:0 0 18px 0;font-family:${BODY_FONT};font-size:16px;line-height:26px;color:${INK};`
  const footerLinkStyle = `color:${INK};text-decoration:underline;`

  const body = PARAGRAPHS.map((text) => `<p style="${paragraphStyle}">${text}</p>`).join('\n')

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(SUBJECT)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600&family=Work+Sans:wght@400&display=swap" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${CREAM}; }
  a { color:${INK}; }
  @media (max-width:600px) { .container { padding:32px 22px !important; } }
</style>
</head>
<body style="margin:0;padding:0;background-color:${CREAM};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Thanks for getting in touch – you’re on the list.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CREAM}" style="background-color:${CREAM};">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]><table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;padding:48px 32px;">
        <tr>
          <td style="padding:0 0 32px 0;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <img src="${LOGO_URL}" width="180" alt="Brockley Fields Studios" style="display:block;width:180px;max-width:100%;height:auto;border:0;outline:none;">
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 16px 0;">
            <h1 style="margin:0;font-family:${HEADING_FONT};font-size:20px;line-height:28px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${GREEN};">You’re on the waiting list</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 28px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="height:1px;line-height:1px;font-size:1px;background-color:${GREEN};">&nbsp;</td></tr></table>
          </td>
        </tr>
        <tr>
          <td>
            <p style="${paragraphStyle}">Hi ${name},</p>
            ${body}
            <p style="margin:28px 0 0 0;font-family:${BODY_FONT};font-size:16px;line-height:26px;color:${INK};">Carey<br>Brockley Fields Studios, SE4</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 0 0 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="height:1px;line-height:1px;font-size:1px;background-color:${GREEN};">&nbsp;</td></tr></table>
            <p style="margin:16px 0 0 0;font-family:${BODY_FONT};font-size:13px;line-height:20px;color:${INK};">
              <a href="${SITE_URL}" style="${footerLinkStyle}">brockleyfields.com</a>
              &nbsp;·&nbsp;
              <a href="https://instagram.com/brockleyfields" style="${footerLinkStyle}">@brockleyfields</a>
              &nbsp;·&nbsp;
              <a href="mailto:${REPLY_TO}" style="${footerLinkStyle}">${REPLY_TO}</a>
            </p>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`
}

export async function sendConfirmationEmail({ name, email }: { name: string; email: string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const firstName = firstNameOf(name)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: REPLY_TO,
      subject: SUBJECT,
      html: renderConfirmationHtml(firstName),
      text: renderConfirmationText(firstName),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Resend: ${response.status} ${response.statusText} ${body.slice(0, 500)}`)
  }
}
