# AI E-commerce Backend

Node.js Express API for the AI-Driven E-commerce Platform.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Environment Variables:
    Copy `.env.example` to `.env` and fill in the values.
    If you don't have Azure keys yet, leave them as is or empty to use **Mock Mode**.

3.  Run Locally:
    ```bash
    npm run dev
    ```

## API Endpoints

-   `GET /api/search?q=query`: Search products (Mock or Cognitive Search).
-   `POST /api/recommend`: Get product recommendations (Mock or OpenAI).
    -   Body: `{ "userProfile": {...}, "products": [...] }`
-   `POST /api/chat`: Chat with AI assistant (Mock or OpenAI).
    -   Body: `{ "messages": [{ "role": "user", "content": "..." }] }`

## Testing

Run unit tests:
```bash
npm test
```
