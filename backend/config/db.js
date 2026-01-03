import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options are no longer needed in Mongoose 6+
            // but keeping them doesn't hurt for backward compatibility
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }

    // Connection event listeners
    mongoose.connection.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`❌ MongoDB connection error: ${err}`);
    });
};

export default connectDB;
