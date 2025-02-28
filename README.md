# Environment Configuration

This project uses environment variables to manage API endpoints and Firebase configuration securely. Below is a guide to setting up the `.env` file for local development.

## Setup `.env` File

Create a `.env` file in the root of your project and define the required environment variables as follows:

```bash
VITE_APP_BASE_URL=<API_BASE_URL>
VITE_APP_FIREBASE_API_KEY=<FIREBASE_API_KEY>
VITE_APP_FIREBASE_AUTH_DOMAIN=<FIREBASE_AUTH_DOMAIN>
VITE_APP_FIREBASE_PROJECT_ID=<FIREBASE_PROJECT_ID>
VITE_APP_FIREBASE_STORAGE_BUCKET=<FIREBASE_STORAGE_BUCKET>
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=<FIREBASE_MESSAGING_SENDER_ID>
VITE_APP_FIREBASE_APP_ID=<FIREBASE_APP_ID>
