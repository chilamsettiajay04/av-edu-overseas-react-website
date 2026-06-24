const SECRET = "AvEdu@2024#2026";
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyLUlV95k81h5o_hW44Be1JNV6bgHKhQVxU4WgyBukNDrSD0J_h0Abj6ou7PdgoGjip/exec";

export async function submitToSheet(data: Record<string, string>): Promise<void> {
  const payload = JSON.stringify({
    ...data,
    _t: Date.now().toString(),
    _s: sessionId(),
  });
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signature = Array.from(new Uint8Array(sigBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  await fetch(APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ payload, signature }),
    headers: { "Content-Type": "application/json" },
  });
}

function sessionId(): string {
  let id = sessionStorage.getItem("_sid");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("_sid", id);
  }
  return id;
}
