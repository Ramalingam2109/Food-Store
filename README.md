# Food Store Project

Responsive marketing site for a fictional food delivery brand. The app is built with plain HTML/CSS, Tailwind, and vanilla JS. A contact form writes customer inquiries directly to Firebase Realtime Database.

## Live Preview


- foodstore-fa389.web.app

- foodstore-fa389.firebaseapp.com


## Tech & Services

- Tailwind CDN styling + custom CSS.
- Firebase Realtime Database for contact form submissions.
- Firebase Hosting for static site delivery.
- GitHub Actions for continuous deployment from the `main` branch.

## Project Structure

```
Projects/Food-Store-Project/
├── index.html
├── style.css
├── script.js
├── firebase.json
├── firebase-config.example.js   # template copied during CI
└── .github/workflows/firebase-hosting.yml
```

## Local Development

1. Clone the repo and switch to `main`.
2. Copy `firebase-config.example.js` to `firebase-config.js`, then fill in your Firebase project credentials.
3. Serve the folder with any static server (e.g. `npx serve Projects/Food-Store-Project`).

## Deployment Pipeline

GitHub Actions automatically deploys the site to Firebase Hosting whenever changes land on `main`.

Secrets required in the repository settings:

| Secret | Description |
| --- | --- |
| `FIREBASE_TOKEN` | CI token from `firebase login:ci` |
| `FIREBASE_API_KEY` | Web API key for the Firebase project |
| `FIREBASE_AUTH_DOMAIN` | e.g. `foodstore-fa389.firebaseapp.com` |
| `FIREBASE_DATABASE_URL` | Realtime DB URL |
| `FIREBASE_PROJECT_ID` | Firebase project id |
| `FIREBASE_STORAGE_BUCKET` | Storage bucket URL |
| `FIREBASE_MESSAGING_SENDER_ID` | Messaging sender id |
| `FIREBASE_APP_ID` | Web app id |

During CI the workflow generates `firebase-config.js` from these secrets before deploying with `firebase deploy --only hosting`.

## Manual Deployment

If you prefer local deploys:

```bash
cd Projects/Food-Store-Project
firebase login
firebase use foodstore-fa389
firebase deploy --only hosting
```

## Security Notes

- Never commit real credentials. Keep `firebase-config.js` gitignored and configure secrets through GitHub or local environment files.
- Rotate leaked keys immediately via the Firebase Console and update the corresponding GitHub secrets.

## Contact

Questions or improvements? Open an issue or PR on [GitHub](https://github.com/Ramalingam2109/Food-Store).
