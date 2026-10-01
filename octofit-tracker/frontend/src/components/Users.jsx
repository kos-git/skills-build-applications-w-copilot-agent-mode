import ResourcePage from './ResourcePage.jsx'

const columns = [
  { label: 'Member', value: (user) => user.username ?? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() },
  { label: 'Email', value: (user) => user.email },
  { label: 'Team', value: (user) => user.team?.name ?? user.team_name ?? user.team },
  { label: 'Points', value: (user) => user.points ?? user.total_points },
]

function Users() {
  return (
    <ResourcePage
      title="Members"
      eyebrow="Our community"
      description="Meet the people showing up, supporting each other, and getting stronger together."
      resource="users"
      endpoint="/api/users/"
      columns={columns}
    />
  )
}

export default Users