# Contact Management Backend API

A robust RESTful API built with Node.js, Express, and MongoDB for managing contacts.

## 🚀 Features

- ✅ Full CRUD operations for contacts
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration
- ✅ Environment-based configuration
- ✅ Professional code structure (MVC pattern)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file should already exist with your MongoDB URI
   - Update the `MONGO_URI` if needed

## 🏃‍♂️ Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get single contact by ID |
| POST | `/contacts` | Create new contact |
| PUT | `/contacts/:id` | Update contact by ID |
| DELETE | `/contacts/:id` | Delete contact by ID |
| GET | `/health` | Health check |



## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── contactController.js  # Request handlers
├── models/
│   └── Contact.js         # Contact schema
├── routes/
│   └── contactRoutes.js   # API routes
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── server.js             # Entry point
└── README.md             # Documentation
```

## 🔧 Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

## ⚠️ Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Database connection issues
- Invalid MongoDB IDs
- Duplicate entries
- Server errors

All errors return appropriate HTTP status codes and descriptive messages.


## 📝 Notes

- All timestamps are automatically managed by MongoDB
- Email validation is enforced at the schema level
- The API supports CORS for frontend integration
- Contacts are sorted by creation date (newest first)

## 🤝 Frontend Integration

The backend is designed to work seamlessly with the React frontend located in the `../frontend` directory. Make sure both servers are running for full functionality.

