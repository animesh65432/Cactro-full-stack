
🎥 YouTube Video Manager Dashboard
A mini-dashboard that connects to the YouTube API and helps users manage one of their uploaded videos in detail.

🚀 Features
🔍 View video details (title, description, stats)

💬 Post and reply to YouTube comments

📝 Edit video title and description

❌ Delete user comments

🧠 Add notes to improve video (stored in MongoDB)

🔎 Search/filter notes

📈 All actions logged in the database as event logs

youtube-dashboard/
├── backend/              # Express.js + TypeScript API
│   ├── src/
│   │   ├── config/       # Environment & service config
│   │   ├── controllers/  # API logic
│   │   ├── db/           # MongoDB connection
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Helper functions
│   └── Dockerfile        # Optional containerization
│   └── index.ts          # Entry point
├── frontend/             # React + Vite + TypeScript UI
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── lib/          # API interaction logic
│   │   ├── types/        # Shared TypeScript types
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   └── vite.config.ts    # Vite config
├── README.md             # Project documentation


🧪 API Endpoints (Backend)

Method	     Endpoint	                Description
GET	         /videos/:videoId        	Fetch video details & stats
GET         /comments/:videoId          Get the all comments from video
POST	    /comments/:videoId	        Post a new comment
POST	    /comments/reply/:parentId	Reply to a comment
DELETE	    /comments/:commentId	    Delete a comment
PUT	        /videos/:videoId	        Update title & description
POST	    /notes	                    Add a new note
GET	        /notes	                    Get notes for a video


🧮 MongoDB Schema
📄 Note Model

{
 videoId: string,
 content: string,
 tags: [string],
 createdAt:date
}


📄 EventLog Model

{

    action: string,
    videoId: string,
    details: string,
    timestamp: date
}


🌐 Tech Stack
Frontend: React.js + TypeScript

Backend: Node.js + Express + TypeScript

Database: MongoDB (Mongoose)


Deployment: Vercel (Frontend) + Render/Heroku (Backend)



🧭 Setup & Run Locally
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/animesh65432/Cactro-full-stack.git
cd youtube-dashboard

2. Backend Setup
bash
Copy
Edit
cd backend
pase .env.example to .env varaiable
npm install
npm run  build
npm run start
cd ..

3. Frontend Setup

cd frontend
npm install
npm run dev


🚀 Deployment
Frontend: https://cactro-full-stack.vercel.app

Backend: https://cactro-full-stack-1.onrender.com


