# Google Login on Production (www.qbrixsolutions.com)

## 0. Use your custom domain (not the Vercel URL)

**Middleware redirects all `*.vercel.app` traffic to `https://www.qbrixsolutions.com`.** So the app is always served from your domain. Use **https://www.qbrixsolutions.com** for the site and for login; avoid the `*.vercel.app` deployment URL.

1. In [Vercel](https://vercel.com) → your **qb-site** project → **Settings** → **Domains**: add **www.qbrixsolutions.com** (and **qbrixsolutions.com** if you use it) and set **www** as production.
2. Always open the app at **https://www.qbrixsolutions.com** (e.g. `/login`, `/api/auth/debug-redirect-uri`). Do not use the Vercel deployment link.

## 1. Fix redirect URI in Google Cloud Console

NextAuth sends `{base}/api/auth/callback/google` to Google (where `base` is the **request host**). With the middleware above, traffic is redirected to www, so the host is **www.qbrixsolutions.com**. That **exact** callback URL must be in **Authorized redirect URIs**.

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

## 3. Schema sync (Account, Session, VerificationToken)

The build runs `prisma db push`, which creates the NextAuth tables (`Account`, `Session`, `VerificationToken`) if they’re missing. Ensure **`qbrix_DATABASE_URL`** is set in Vercel (including at **build** time) so the schema can sync.

**One-time fix** if you already hit “table Account does not exist”:

1. Locally, set `qbrix_DATABASE_URL` to your **production** Neon URL (or use Vercel’s value).
2. Run: `npx prisma db push`
3. Redeploy the app on Vercel.

## 4. Deploy and test

1. Trigger a new deployment (push to main or redeploy).
2. Open **https://www.qbrixsolutions.com/login**.
3. Click **Continue with Google** and sign in.

Users will be stored in your `users` table (and `Account` for OAuth) in Neon.

---

**Security:** You shared your client secret in chat. Consider creating a **new client secret** in Google Console (Credentials → your OAuth client → Add secret, then remove the old one) and updating `GOOGLE_CLIENT_SECRET` in Vercel.

---

## Error 400: redirect_uri_mismatch

Google returns this when the redirect URI our app sends does **not exactly match** any **Authorized redirect URI** in your OAuth client.

### Step 0: Find the exact redirect_uri we send (do this first)

1. Deploy the app (it includes a debug route).
2. **Open the debug URL from the same domain you use for login** (e.g. **https://www.qbrixsolutions.com/api/auth/debug-redirect-uri**). Do not use a different domain or the Vercel deployment URL unless you also sign in from that URL.
3. Copy **`add_this_exact_value_to_google`** (or `redirect_uri_nextauth_uses`) from the JSON.
4. In Google Console → Credentials → your OAuth client → **Authorized redirect URIs**, add that value **exactly**.
5. **Remove** any redirect URI that doesn't match (e.g. site root only). Click **Save**.
6. Try sign-in again from the same domain you used in step 2.

**On Vercel, NextAuth uses the request Host.** Middleware redirects `*.vercel.app` → www, so when you use **https://www.qbrixsolutions.com**, the host is www and the redirect URI is `https://www.qbrixsolutions.com/api/auth/callback/google`.

**Belt-and-suspenders:** Add **both** of these to Authorized redirect URIs:
- `https://www.qbrixsolutions.com/api/auth/callback/google`
- `https://qbrixsolutions.com/api/auth/callback/google` (if you use non-www)

### Fix checklist

1. **Redirect URI in Google**
   - Must **exactly** match what we send. Use `/api/auth/debug-redirect-uri` (from the same domain as login) to see it.
   - On Vercel we use the **request host**; the debug route shows `redirect_uri_nextauth_uses` / `add_this_exact_value_to_google`.

2. **`NEXTAUTH_URL` in Vercel**
   - **Set it explicitly** to `https://www.qbrixsolutions.com` (no trailing slash). Do not rely on Vercel defaults when using a custom domain.
   - Project → Settings → Environment Variables → Production. Add or edit `NEXTAUTH_URL`.

3. **www vs non-www / Vercel URL**
   - If users use `https://qbrixsolutions.com` (no www), add  
     `https://qbrixsolutions.com/api/auth/callback/google` in Google.
   - **Use the custom domain (www) only.** Middleware redirects vercel.app → www, so you should not need `*.vercel.app` redirect URIs.

4. **Redeploy**
   - After changing `NEXTAUTH_URL` in Vercel, **redeploy** so the new value is used. Then check `/api/auth/debug-redirect-uri` again.

5. **Confirm**
   - Authorized redirect URIs in Google must **exactly** match the redirect we send. One character wrong causes `redirect_uri_mismatch`.

---

## Error: Callback (`/login?error=Callback`)

You’re sent back to the login page with `error=Callback` after Google redirects. This means the **callback handler** failed (after token exchange), not the redirect URI.

### What to do

1. **Check Vercel logs**  
   In Vercel → Project → Logs (or **Deployments** → … → **View Function Logs**), look for **`OAUTH_CALLBACK_HANDLER_ERROR`** on the `/api/auth/callback/google` request. That log includes the real error (e.g. DB, adapter, cookie).

2. **Enable debug**  
   In Vercel → **Settings** → **Environment Variables**, add `NEXTAUTH_DEBUG` = `1` for **Production**, then **Redeploy**. Retry sign-in and check the logs again; you’ll get more detailed NextAuth logs.

3. **Common causes**
   - **Cookies**: State/PKCE cookies not sent on callback (e.g. domain mismatch, SameSite). Use **https://www.qbrixsolutions.com** for both login and callback; avoid `*.vercel.app`.
   - **Database**: Adapter `createUser` / `linkAccount` failing (Neon connectivity, unique constraint, schema mismatch). Check Neon logs and `qbrix_DATABASE_URL`.
   - **“Table Account does not exist”**: Run `npx prisma db push` against the production DB (with `qbrix_DATABASE_URL`), then redeploy. The build runs `prisma db push` so future deploys create missing tables.
   - **Duplicate email**: Same email used with another provider and `allowDangerousEmailAccountLinking` is false → use the existing provider or enable that option.

4. **Login page**  
   The app shows a short message when `error=Callback` and suggests enabling `NEXTAUTH_DEBUG` and checking Vercel logs.
