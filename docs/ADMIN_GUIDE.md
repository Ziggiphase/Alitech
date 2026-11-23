# Alitech Admin Dashboard

Open **`/admin`** on the website (e.g. `http://localhost:5173/admin` while testing, or `https://YOUR-SITE/admin` once it's live).
Sign in with an approved Google account.

| Tab | What it's for |
|---|---|
| **Overview** | Sales, profit, stock for Today / This week / This month / Last month / This year / All time / Custom dates. **Excel** and **PDF** buttons download the report. |
| **Stock & Sales** | Record every phone you buy (model, IMEI, grade, battery, what you paid). Tap **Mark sold** when it's sold (price, date, customer). Private, so customers never see this. |
| **Website** | The products customers see in the shop: photos, price, condition, specs. Changes show on the site immediately. |

**Linking stock to a listing:** when you add a phone in *Stock & Sales*, pick its *Website listing*. When the last linked phone is sold, that listing shows **Sold out** on the website by itself. It comes back automatically when you add another one.

---

## Where the data lives (all free)

- **Firebase** (project `alitech-7bafd`) stores the product listings and the stock/sales records.
- **Cloudinary** (cloud `pr9klcqo`) stores the product photos and serves them small and fast.
- Settings are in `src/config/firebase.js`.

## One-time setup in the Firebase console

Do these once at https://console.firebase.google.com → project **alitech**:

1. **Security rules** (required, because the site can't read or save anything until this is done)
   Firestore Database → **Rules** tab → delete what's there → paste the whole content of `firestore.rules` from this project → **Publish**.
2. **Google sign-in**: Authentication → Sign-in method → **Google** → Enabled.
3. **Website address**: once the site is online, go to Authentication → Settings → **Authorized domains** → *Add domain* and add the site's address (e.g. `alitech.netlify.app`). `localhost` is already there for testing.

## Adding or removing someone from the dashboard

Edit the email list in **both** places, then publish/deploy:
- `src/config/firebase.js` → `ADMIN_EMAILS`
- `firestore.rules` → the list inside `isAdmin()` → paste into Firebase console → **Publish**

## Cloudinary upload preset

The preset `o7ltvvnz` must be **Unsigned** (Cloudinary → Settings → Upload → Upload presets).
Recommended in the preset: *Allowed formats* `jpg, png, webp, heic`, *Max file size* ~15 MB, *Folder* `alitech`.
Photos are shrunk on the phone before upload, so they upload quickly on mobile data.

## Deploy (free)

Use **Netlify** or **Cloudflare Pages** (both allow business sites on the free plan):
Build command `npm run build`, output folder `dist`. `public/_redirects` already makes `/admin` and product links work.
Product changes do **not** need a redeploy because they're read live from Firebase.

## For developers: testing without Firebase

`VITE_MOCK_BACKEND=1 npm run dev` swaps Firebase for an in-browser stand-in (data kept in localStorage).
Any Google sign-in is faked as `bellobasit790@gmail.com`. Never deploy a build made with this flag.
