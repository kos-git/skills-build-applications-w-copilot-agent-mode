import ResourcePage from './ResourcePage.jsx'

const columns = [
  { label: 'Rank', value: (entry, index) => entry.rank ?? index + 1 },
  { label: 'Member or team', value: (entry) => entry.user?.username ?? entry.team?.name ?? entry.username ?? entry.name ?? entry.user ?? entry.team },
  { label: 'Team', value: (entry) => entry.team?.name ?? entry.team_name },
  { label: 'Points', value: (entry) => entry.points ?? entry.score ?? entry.total_points },
]

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      eyebrow="Friendly competition"
      description="Celebrate consistent effort and see how the community is moving this week."
      resource="leaderboard"
      endpoint="/api/leaderboard/"
      columns={columns}
    />
  )
}

export default Leaderboard