import { peekToken } from "@/lib/auth";
import { VerifyConfirmButton } from "./VerifyConfirmButton";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; next?: string }>;
}) {
  const { token, next } = await searchParams;
  const valid = token ? await peekToken(token) : false;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative w-full max-w-md text-center glass rounded-2xl border border-[var(--portal-border)] p-10">
        {valid && token ? (
          <VerifyConfirmButton token={token} next={next ?? "/portal/dashboard"} />
        ) : (
          <>
            <h1
              className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Link expired
            </h1>
            <p className="text-[var(--portal-text-secondary)] text-sm leading-relaxed mb-6">
              This sign-in link is invalid, expired, or has already been used.
            </p>
            <a
              href="/portal/sign-in"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              Request a new link
            </a>
          </>
        )}
      </div>
    </section>
  );
}
