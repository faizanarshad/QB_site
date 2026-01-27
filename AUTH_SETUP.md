# Google & Microsoft OAuth Setup

Users who sign in with **Google** or **Microsoft** are stored in the `users` table (and `accounts` for OAuth linkage). Add these env vars to `.env`:

## Google

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Create OAuth 2.0 Client ID.
2. Application type: **Web application**.
3. Authorized redirect URIs: add **both** `http://localhost:3000/api/auth/callback/google` and `http://localhost:3001/api/auth/callback/google` (dev), plus `https://yourdomain.com/api/auth/callback/google` (prod).

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Microsoft (Azure AD)

1. [Azure Portal](https://portal.azure.com/) → Azure Active Directory → App registrations → New registration.
2. Redirect URI: **Web** → `http://localhost:3000/api/auth/callback/azure-ad` (and prod URL).
3. Certificates & secrets → New client secret.
4. API permissions → Add **OpenID** (openid, profile, email).

```env
AZURE_AD_CLIENT_ID="your-azure-application-client-id"
AZURE_AD_CLIENT_SECRET="your-azure-client-secret"
AZURE_AD_TENANT_ID="common"
```

- `AZURE_AD_TENANT_ID`: use `common` for any Microsoft account, or your tenant ID for single-tenant.

## Required in `.env`

- `NEXTAUTH_SECRET` – used to sign tokens (set a random string).
- `NEXTAUTH_URL` – must match the URL you use (e.g. `http://localhost:3001` if you run `npm run dev` on port 3001, or `http://localhost:3000` for `npm run dev:3000`).

## After adding env vars

1. `npm install`
2. `npx prisma generate`
3. `npx prisma migrate dev --name add_nextauth_oauth` (or `npx prisma db push`)
4. `npm run dev`

Sign-in page: **/login**. User records are created/updated on first sign-in.
