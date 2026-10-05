import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Rivera' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Lee' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Kim' },
    ]);

    await Team.create({
      name: 'Mergington Movers',
      description: 'Friendly competition for the whole school.',
      members: users.map((user) => user._id),
    });

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 30, distanceKm: 4.2, points: 42 },
      { user: users[1]._id, type: 'walking', durationMinutes: 45, distanceKm: 3.5, points: 35 },
      { user: users[2]._id, type: 'strength', durationMinutes: 25, points: 30 },
    ]);

    await Workout.create([
      { title: 'Quick Cardio Boost', description: 'A short run or brisk walk to raise your heart rate.', difficulty: 'beginner', activityType: 'running', durationMinutes: 20 },
      { title: 'Full Body Foundation', description: 'A balanced strength session using bodyweight movements.', difficulty: 'intermediate', activityType: 'strength', durationMinutes: 30 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
