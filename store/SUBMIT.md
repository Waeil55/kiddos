# Publishing Kiddos to the App Store and Google Play

The code, the Android project (`android/`) and the iOS project (`ios/`, Swift Package Manager) are ready. The steps below need your accounts, payment or a Mac, so only you can do them.

## 1. Hosting (needed by both stores)

The phone apps call the Kiddos server at `MOBILE_API` in `src/api.ts` (now `https://dr-mariam.com`). dr-mariam.com currently serves TutorIa, so the apps need their own address before release:

- Quickest: route a subdomain to the existing `kiddos` tunnel, then set `MOBILE_API` to `https://kiddos.dr-mariam.com`:
  `cloudflared tunnel route dns kiddos kiddos.dr-mariam.com`, and add that hostname to `deploy/cloudflared-kiddos.yml`.
- Reviewers and families need it up all the time. A home PC that sleeps or reboots will get the app rejected ("app did not load"). A small always-on host (any Node 20 VPS or container) is safer.

The privacy and support pages ship inside the app and are also served at `/privacy/` and `/support/` on that host. Before submitting, replace `{{CONTACT_EMAIL}}` in `public/privacy/index.html` and `public/support/index.html`.

## 2. Google Play

1. Create a Google Play Console developer account ($25 one-time) and verify your identity.
2. Create the upload key once, and keep it and its passwords backed up (losing it means asking Google to reset it):
   `keytool -genkeypair -v -keystore kiddos-upload.keystore -alias kiddos -keyalg RSA -keysize 2048 -validity 10000`
   Then create `android/keystore.properties` (it is git-ignored) with:
   ```
   storeFile=C:/path/to/kiddos-upload.keystore
   storePassword=...
   keyAlias=kiddos
   keyPassword=...
   ```
3. Build: `npm run build`, `npx cap sync android`, then in `android/`: `gradlew.bat bundleRelease`. Upload `android/app/build/outputs/bundle/release/app-release.aab`.
4. In Play Console: turn on Play App Signing, fill in the store listing from `store/LISTING.md`, set the target audience to children (Families policy), complete the Data safety form and content rating, add the privacy policy URL, and publish to Internal testing first.

## 3. Apple App Store

1. Join the Apple Developer Program ($99/year) with your Apple ID (waeil.dev@gmail.com). To show "Agape Care" as the seller, enroll as an organization (needs a D-U-N-S number); otherwise your own name is shown.
2. You need a Mac with Xcode 26, or a cloud Mac:
   - Mac: `npm run build`, `npx cap sync ios`, `npx cap open ios`. In Xcode, pick your team under Signing & Capabilities, then Product → Archive → Distribute App → App Store Connect.
   - No Mac: a cloud build service such as Codemagic (it has a free monthly allowance and builds Capacitor apps). Push the project to a private GitHub repo, connect it, and add your App Store Connect API key there.
3. In App Store Connect: create the app (bundle ID `care.agape.kiddos`), fill in the listing from `store/LISTING.md`, choose the Kids Category (ages 6-8), answer the App Privacy questions to match the privacy policy, upload screenshots, and submit for review with the review notes from `LISTING.md`.

## Before each release

- Bump the version: `versionCode` and `versionName` in `android/app/build.gradle`; Version and Build in Xcode.
- `npm run build` then `npx cap sync`.
- Test on a real phone: lesson, voice, "Allow microphone" in the parent settings, then talking to the buddy.
