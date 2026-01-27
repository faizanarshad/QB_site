# Google Login on Production (www.qbrixsolutions.com)

## 1. Fix redirect URI in Google Cloud Console

Your current redirect URI is `https://www.qbrixsolutions.com` (site root). NextAuth requires the **callback path**.

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Open your OAuth 2.0 client (e.g. **Web client** for project `modular-embassy-485610-c6`).
3. Under **Authorized redirect URIs**, ensure you have:
   - `https://www.qbrixsolutions.com/api/auth/callback/google`
4. Under **Authorized JavaScript origins**, keep:
   - `https://www.qbrixsolutions.com`
5. Save.

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
