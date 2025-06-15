# 🎥 YouTube Video Manager Dashboard

A comprehensive mini-dashboard that connects to the YouTube API and helps users manage their uploaded videos with advanced features for content management and analytics.

## 🚀 Features

- 🔍 **Video Management**: View detailed video information (title, description, statistics)
- 💬 **Comment System**: Post new comments and reply to existing ones
- 📝 **Content Editing**: Edit video titles and descriptions directly
- ❌ **Comment Moderation**: Delete user comments as needed
- 🧠 **Note Taking**: Add and manage improvement notes (stored in MongoDB)
- 🔎 **Search & Filter**: Advanced search and filtering for notes
- 📈 **Activity Logging**: All actions automatically logged in database

## 📁 Project Structure

```
youtube-dashboard/
├── backend/                    # Express.js + TypeScript API
│   ├── src/
│   │   ├── config/            # Environment & service configuration
│   │   ├── controllers/       # API logic and handlers
│   │   ├── db/               # MongoDB connection setup
│   │   ├── models/           # Mongoose data models
│   │   ├── routes/           # API route definitions
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Helper functions and utilities
│   ├── Dockerfile            # Container configuration (optional)
│   └── index.ts              # Application entry point
├── frontend/                  # React + Vite + TypeScript UI
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── lib/             # API interaction logic
│   │   ├── types/           # Shared TypeScript types
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Frontend entry point
│   └── vite.config.ts       # Vite configuration
└── README.md                 # Project documentation
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/videos/:videoId` | Fetch video details & statistics |
| `GET` | `/comments/:videoId` | Get all comments from a video |
| `POST` | `/comments/:videoId` | Post a new comment |
| `POST` | `/comments/reply/:parentId` | Reply to an existing comment |
| `DELETE` | `/comments/:commentId` | Delete a specific comment |
| `PUT` | `/videos/:videoId` | Update video title & description |
| `POST` | `/notes` | Add a new improvement note |
| `GET` | `/notes?videoId=VIDEO_ID` | Get notes for a specific video |

## 🗄️ Database Schema

### Note Model
```typescript
{
  videoId: string,
  content: string,
  tags: string[],
  createdAt: Date
}
```

### EventLog Model
```typescript
{
  action: string,
  videoId: string,
  details: string,
  timestamp: Date
}
```

## 🛠️ Tech Stack

- **Frontend**: React.js + TypeScript + Vite
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **APIs**: YouTube Data API v3
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- YouTube API credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/animesh65432/Cactro-full-stack.git
   cd youtube-dashboard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env with your YouTube API key and MongoDB connection string
   
   # Install dependencies
   npm install
   
   # Build TypeScript
   npm run build
   
   # Start the server
   npm run start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

## 🌐 Live Demo

- **Frontend**: [https://cactro-full-stack.vercel.app](https://cactro-full-stack.vercel.app)
- **Backend API**: [https://cactro-full-stack-1.onrender.com](https://cactro-full-stack-1.onrender.com)

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key_here

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Animesh** - [GitHub Profile](https://github.com/animesh65432)

## 🙏 Acknowledgments

- YouTube Data API v3 for video management capabilities
- MongoDB for reliable data storage
- React and TypeScript communities for excellent tooling
