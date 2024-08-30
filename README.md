# CMORSS-Tic-Tac-Toe

## Project Description

CMORSS-Tic-Tac-Toe is a web-based Tic-Tac-Toe game developed as a submission for the qualification stage of the ALX SE Face-Off Cup. This project showcases a modern, feature-rich implementation of the classic game using the MERN stack (MongoDB, Express.js, React, Node.js), enhanced with TailwindCSS for styling and Socket.io for real-time multiplayer functionality.\*\*\*\*

This was a collaborative projects of Six Software Enginggering Students of the ALX Fullstack Software Enginggering Programme, coming from different Cohorts from C18 to C22.

## Team Members

- [Rayane](https://github.com/RyanTk03)
- [Stephen Omoregie](https://github.com/Cre8steveDev)
- [Mikiyas](https://github.com/mikiyas-girma)
- [Houssem Eddine](https://github.com/SeM2x)
- [Christadrian Madegwa](https://github.com/Prish20)
- [Onyango Ondigo](https://github.com/ondi20)

## Features

- Player vs AI mode
- Real-time multiplayer mode using Socket.io
- Client-side routing and authentication
- State management for user preferences
- Responsive design for mobile and desktop
- User data persistence (wins, losses, game history)

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express.js
- Database: MongoDB
- Real-time Communication: Socket.io
- Styling: TailwindCSS
- Build Tool: Vite
- Version Control: Git & GitHub

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RyanTk03/CMORSS-Tic-Tac-Toe.git
   cd CMORSS-Tic-Tac-Toe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add necessary variables (database URL, API keys, etc.)

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

## Project Structure

```
CMORSS-Tic-Tac-Toe/
│
├── frontend/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React context for state management
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # Type Definitions
│   │   ├── utils/          # Utility functions
│   │   ├── App.css
│   │   ├── App.tsx         # Main React component
│   │   ├── index.css
│   │   └── main.tsx        # Entry point for the application
│   │
│   ├── public/             # Public assets
│   └── vite.config.js      # Vite configuration
│
├── backend/                 # Backend Node.js/Express application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── app.js          # Express app setup
│   │
│   └── socket/             # Socket.io setup and event handlers
│
├── .gitignore
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ALX SE for organizing the Face-Off Cup
- The open-source community for the amazing tools and libraries used in this project

---
