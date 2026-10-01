import ResourcePage from './ResourcePage.jsx'

const columns = [
  { label: 'Team', value: (team) => team.team_name ?? team.name ?? team.title },
  { label: 'Members', value: (team) => team.members?.length ?? team.member_count },
  { label: 'Points', value: (team) => team.points ?? team.total_points ?? team.score },
  { label: 'Created', value: (team) => team.created_at ?? team.created },
]

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      eyebrow="Better in a pack"
      description="Find your crew, build good habits, and make every challenge a team effort."
      resource="teams"
      columns={columns}
    />
  )
}

export default Teams