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

**To get your MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

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

### Example API Request (POST)
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello!"
  }'
```

## 🚀 Deployment

### Backend Deployment (Render/Railway/Cyclic)

**For Render:**
1. Push your code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables: `MONGO_URI`, `PORT`, `NODE_ENV=production`

**For Railway:**
1. Push to GitHub
2. Create new project on Railway
3. Add MongoDB plugin OR use MongoDB Atlas
4. Set root directory to `backend`
5. Add environment variables

### Frontend Deployment (Vercel/Netlify)

**For Vercel:**
```bash
cd frontend
npm run build
npx vercel --prod
```

Or connect your GitHub repo to Vercel dashboard.

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

## ✅ Functionality Checklist

- [x] Contact Form with validation
- [x] Required fields (Name, Email, Phone)
- [x] Optional message field
- [x] Email format validation
- [x] Disabled submit button when invalid
- [x] Success/Error messages
- [x] MongoDB integration
- [x] RESTful API with proper error handling
- [x] Display contacts in table
- [x] Auto-refresh on add
- [x] Delete functionality
- [x] Responsive design
- [x] Clean code with comments
- [x] MVC architecture
- [x] Production-ready

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Verify your `MONGO_URI` in `.env`
- Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)
- Ensure database user has correct permissions

**CORS Error:**
- Backend has CORS enabled by default
- If deploying, ensure frontend `.env` has correct API URL

**Port Already in Use:**
- Change `PORT` in backend `.env`
- Frontend port can be changed in `vite.config.js`

## 👨‍💻 Development Notes

- Backend uses MVC architecture
- All API responses follow consistent format
- Input validation on both frontend and backend
- Mongoose schema validation
- Clean, readable code with comments
- No console errors or warnings

## 📝 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using MERN Stack**
