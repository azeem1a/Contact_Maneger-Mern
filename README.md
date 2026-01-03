# Contact Management App - MERN Stack

A complete Contact Management Web Application built with MongoDB, Express.js, React.js, and Node.js (MERN Stack).

## 🚀 Features

- ✅ Add new contacts with validation
- ✅ View all contacts in a responsive table
- ✅ Delete contacts
- ✅ Real-time updates without page reload
- ✅ Client-side and server-side validation
- ✅ Clean, modern UI with Tailwind CSS
- ✅ RESTful API architecture
- ✅ Production-ready code

## 📁 Project Structure

```
contact-management-app/
├── backend/               # Node.js + Express API
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── .env             # Environment variables (create this)
│   └── server.js        # Entry point
└── frontend/             # React + Vite app
    ├── src/
    │   ├── components/  # React components
    │   └── services/    # API service
    └── ...
```

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

### Frontend
- React.js (with Vite)
- Tailwind CSS
- Axios
- ES6+

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account OR local MongoDB installation
- npm or yarn

### 1. Clone the Repository
```bash
cd contact-management-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the contents below and add your MongoDB URI
```

**Create `backend/.env` file:**
```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
```


**Start the backend server:**
```bash
npm run dev
# OR
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173` (or the port shown in terminal)

## 🧪 Testing the Application

1. **Backend Health Check:**
   - Open browser: `http://localhost:5000`
   - Should see: `{"message":"Contact Management API","status":"Server is running"}`

2. **Frontend:**
   - Open browser: `http://localhost:5173`
   - Fill out the contact form
   - Submit and verify the contact appears in the list below

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/contacts` | Get all contacts |
| POST   | `/api/contacts` | Create new contact |
| DELETE | `/api/contacts/:id` | Delete a contact |



## 🚀 Deployment

### Backend Deployment (Render)


### Frontend Deployment (Vercel)


**Environment Variable for Frontend:**
- Create `.env` in frontend:
```env
VITE_API_URL=https://your-backend-url.com/api
```

**For Netlify:**
```bash
cd frontend
npm run build
npx netlify deploy --prod --dir=dist
```




**Built with ❤️ using MERN Stack**
