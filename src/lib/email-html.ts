export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wraps an email body fragment in a full HTML document with an explicit
 * charset. Without this, em dashes/middle dots etc. render as mojibake in
 * some email clients and browsers (they default to Latin-1 when no charset
 * is declared, anywhere in the transport headers or the document itself). */
export function wrapEmailDocument(bodyHtml: string, title = "Spectecle"): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;">
${bodyHtml}
</body>
</html>`;
}
