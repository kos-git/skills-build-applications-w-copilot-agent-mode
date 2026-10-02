import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

const columns = [
  { label: 'Workout', value: (workout) => workout.title ?? workout.name },
  { label: 'Focus', value: (workout) => workout.category ?? workout.type ?? workout.description },
  { label: 'Difficulty', value: (workout) => workout.difficulty ?? workout.level },
  { label: 'Duration', value: (workout) => workout.duration ? `${workout.duration} min` : null },
]

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      eyebrow="Find your next session"
      description="Browse workout ideas and choose a session that fits your goals and energy."
      resource="workouts"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Workouts