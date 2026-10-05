import ResourcePage from './ResourcePage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

const columns = [
  { label: 'Member', value: (activity) => activity.user?.username ?? activity.username ?? activity.user },
  { label: 'Activity', value: (activity) => activity.activity_type ?? activity.type ?? activity.name },
  { label: 'Date', value: (activity) => activity.date ?? activity.created_at },
  { label: 'Duration', value: (activity) => activity.duration ? `${activity.duration} min` : null },
  { label: 'Points', value: (activity) => activity.points ?? activity.score },
]

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      eyebrow="Keep your momentum"
      description="A running log of the work our community puts in, one session at a time."
      resource="activities"
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Activities