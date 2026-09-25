import express from 'express';
import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from './models.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected error';
}

function asyncRoute(
  handler: (request: express.Request, response: express.Response) => Promise<void>,
) {
  return (request: express.Request, response: express.Response): void => {
    handler(request, response).catch((error: unknown) => {
      response.status(400).json({ error: errorMessage(error) });
    });
  };
}

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/users', asyncRoute(async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }));
}));

app.post('/api/users', asyncRoute(async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
}));

app.get('/api/teams', asyncRoute(async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName').sort({ createdAt: -1 }));
}));

app.post('/api/teams', asyncRoute(async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
}));

app.patch('/api/teams/:teamId/members/:userId', asyncRoute(async (request, response) => {
  const team = await Team.findByIdAndUpdate(
    request.params.teamId,
    { $addToSet: { members: request.params.userId } },
    { new: true, runValidators: true },
  ).populate('members', 'username displayName');
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.json(team);
}));

app.get('/api/activities', asyncRoute(async (request, response) => {
  const userId = typeof request.query.userId === 'string' ? request.query.userId : undefined;
  const filter = userId ? { user: userId } : {};
  response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
}));

app.post('/api/activities', asyncRoute(async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(await activity.populate('user', 'username displayName'));
}));

app.get('/api/leaderboard', asyncRoute(async (_request, response) => {
  const leaderboard = await Activity.aggregate([
    { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
    { $sort: { points: -1 } },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { _id: 0, points: 1, activities: 1, user: { _id: 1, username: 1, displayName: 1 } } },
  ]);
  response.json(leaderboard);
}));

app.get('/api/workouts', asyncRoute(async (request, response) => {
  const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : undefined;
  const query = Workout.find();
  if (difficulty) {
    query.where('difficulty').equals(difficulty);
  }
  response.json(await query.sort({ createdAt: -1 }));
}));

app.post('/api/workouts', asyncRoute(async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
}));

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
  });
  connectDatabase().catch((error: unknown) => {
    console.error('Database connection unavailable:', errorMessage(error));
  });
}

export default app;
