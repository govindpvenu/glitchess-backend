# Glitchess Backend

Node.js/Express backend server for the Glitchess multiplayer chess platform.

> 🎮 **Main Repository:** [glitchess](https://github.com/govindpvenu/glitchess)
> 💻 **Frontend Repository:** [glitchess-frontend](https://github.com/govindpvenu/glitchess-frontend)

## Tech Stack

-   **Node.js + Express** — Server framework
-   **TypeScript** — Type safety
-   **MongoDB + Mongoose** — Database
-   **Socket.io** — Real-time WebSocket communication
-   **Passport.js** — Authentication (JWT + Google OAuth)
-   **Resend** — Email service for OTP verification
-   **bcryptjs** — Password hashing

## Project Structure

```
src/
├── config/
│   ├── db.ts              # MongoDB connection
│   └── googleAuth.ts      # Google OAuth configuration
├── controllers/
│   ├── authController.ts  # Auth handlers (register, login, OTP)
│   ├── gameController.ts  # Game-related handlers
│   └── userController.ts  # User profile handlers
├── middlewares/
│   ├── errorHandler.ts    # Error handling middleware
│   └── passportAuth.ts    # JWT authentication middleware
├── models/
│   └── userModel.ts       # User schema (stats, rating, etc.)
├── routes/
│   ├── authRoutes.ts      # /api/auth/*
│   ├── gameRoutes.ts      # /api/game/*
│   └── userRoutes.ts      # /api/user/*
├── socket/
│   └── socket.ts          # Socket.io event handlers
├── utils/
│   ├── generateOTP.ts     # OTP generation
│   ├── generateToken.ts   # JWT token generation
│   ├── sendEmail.ts       # Email sending via Resend
│   └── validateEnv.ts     # Environment validation
└── server.ts              # Express app entry point
```

## API Endpoints

### Authentication (`/api/auth`)

-   `POST /register` — Register new user
-   `POST /login` — Login user
-   `POST /logout` — Logout user
-   `POST /verify-otp` — Verify email OTP
-   `POST /forgot-password` — Request password reset
-   `POST /reset-password` — Reset password
-   `GET /google` — Google OAuth login
-   `GET /google/callback` — Google OAuth callback

### User (`/api/user`)

-   `GET /profile` — Get user profile
-   `PUT /profile` — Update user profile
-   `GET /rankings` — Get player rankings

### Game (`/api/game`)

-   `PUT /wins` — Update win count

## Getting Started

### Prerequisites

-   Node.js 18+
-   MongoDB instance (local or Atlas)
-   Google OAuth credentials
-   Resend API key

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000

# JWT
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

### Installation

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm start
```

The server runs on `http://localhost:5000`

## Available Scripts

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm start`      | Start server with nodemon |
| `npm run lint`   | Run ESLint                |
| `npm run format` | Format code with Prettier |

## Socket.io Events

### Client → Server

-   `username` — Set player username
-   `createRoom` — Create a new game room
-   `joinRoom` — Join existing room by ID
-   `move` — Send chess move to opponent

### Server → Client

-   `opponentJoined` — Opponent joined the room
-   `move` — Receive opponent's move
