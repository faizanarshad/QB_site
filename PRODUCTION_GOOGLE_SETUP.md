# Google Login on Production (www.qbrixsolutions.com)

## 1. Fix redirect URI in Google Cloud Console

NextAuth sends `{NEXTAUTH_URL}/api/auth/callback/google` to Google. That **exact** URL must be in **Authorized redirect URIs**.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Open your OAuth 2.0 client (e.g. **Web client** for project `modular-embassy-485610-c6`).
3. Under **Authorized redirect URIs**:
   - Add **exactly**: `https://www.qbrixsolutions.com/api/auth/callback/google`
   - No trailing slash. Use `https`, not `http`.
   - If users also reach the site at `https://qbrixsolutions.com` (no www), add  
     `https://qbrixsolutions.com/api/auth/callback/google` too.
   - **Remove** any entry that is just `https://www.qbrixsolutions.com` (site root). The callback path is required.
4. Under **Authorized JavaScript origins**:
   - `https://www.qbrixsolutions.com` (and `https://qbrixsolutions.com` if you use both).
5. Click **Save**.

## 2. Set environment variables in Vercel

1. [Vercel Dashboard](https://vercel.com/dashboard) → your **qb-site** project → **Settings** → **Environment Variables**.
2. Add these for **Production** (and optionally Preview if you use a staging URL):

| Name | Value | Notes |
|------|--------|--------|
| `NEXTAUTH_URL` | `https://www.qbrixsolutions.com` | Must match your production domain exactly |
| `GOOGLE_CLIENT_ID` | `799073114541-3nm5a55ociu276tdgjlagqt0u3c3mr78.apps.googleusercontent.com` | From your OAuth client |
| `GOOGLE_CLIENT_SECRET` | *(paste from Google Console)* | From your OAuth client → Client secret; **rotate** it since it was shared in chat |
| `NEXTAUTH_SECRET` | (generate a strong random string) | e.g. `openssl rand -base64 32` |
| `qbrix_DATABASE_URL` | Your Neon Postgres URL | Same as local if you use one DB; **this is the DB env var name used by the app** |

3. Save. **Redeploy** the project (Deployments → … → Redeploy) so the new env vars are used.

## 3. Deploy and test

1. Trigger a new deployment (push to main or redeploy).
2. Open **https://www.qbrixsolutions.com/login**.
3. Click **Continue with Google** and sign in.

Users will be stored in your `users` table (and `accounts` for OAuth) in Neon.

---

**Security:** You shared your client secret in chat. Consider creating a **new client secret** in Google Console (Credentials → your OAuth client → Add secret, then remove the old one) and updating `GOOGLE_CLIENT_SECRET` in Vercel.

---

## Error 400: redirect_uri_mismatch

Google returns this when the redirect URI our app sends does **not exactly match** any **Authorized redirect URI** in your OAuth client.

### Step 0: Find the exact redirect_uri we send (do this first)

1. Deploy the app (it includes a debug route).
2. Open **https://www.qbrixsolutions.com/api/auth/debug-redirect-uri** (or your Vercel URL if you use that).
3. You’ll see JSON with `redirect_uri_used` and `NEXTAUTH_URL`, `VERCEL_URL`.
4. **Add the `redirect_uri_used` value exactly** to Google Console → Credentials → your OAuth client → **Authorized redirect URIs**.
5. Save in Google, then try sign-in again.

**Common cause:** On Vercel, if `NEXTAUTH_URL` is not set, NextAuth uses `VERCEL_URL` (e.g. `https://your-project.vercel.app`). Your app is then using the **Vercel** URL as callback, but you only added the **custom domain** in Google. Fix: either set `NEXTAUTH_URL` to `https://www.qbrixsolutions.com` in Vercel and redeploy, or add **both** redirect URIs in Google:
- `https://www.qbrixsolutions.com/api/auth/callback/google`
- `https://<your-vercel-project>.vercel.app/api/auth/callback/google`  
(Use the exact `redirect_uri_used` from the debug endpoint for the Vercel one.)

### Fix checklist

1. **Redirect URI in Google**
   - Must **exactly** match what we send. Use `/api/auth/debug-redirect-uri` to see it.
   - Typical value: `https://www.qbrixsolutions.com/api/auth/callback/google` (no trailing slash, `https`).

2. **`NEXTAUTH_URL` in Vercel**
   - **Set it explicitly** to `https://www.qbrixsolutions.com` (no trailing slash). Do not rely on Vercel defaults when using a custom domain.
   - Project → Settings → Environment Variables → Production. Add or edit `NEXTAUTH_URL`.

3. **www vs non-www / Vercel URL**
   - If users use `https://qbrixsolutions.com` (no www), set `NEXTAUTH_URL` to that and add  
     `https://qbrixsolutions.com/api/auth/callback/google` in Google.
   - If the debug endpoint shows a `*.vercel.app` URL, add that redirect URI in Google too (or set `NEXTAUTH_URL` so we use your custom domain).

4. **Redeploy**
   - After changing `NEXTAUTH_URL` in Vercel, **redeploy** so the new value is used. Then check `/api/auth/debug-redirect-uri` again.

5. **Confirm**
   - Authorized redirect URIs in Google must **exactly** match the redirect we send. One character wrong causes `redirect_uri_mismatch`.
