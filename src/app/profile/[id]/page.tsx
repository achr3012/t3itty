
export default function Profile({ params }: { params: { id: string } }) {
  const urlId = params.id
  return (
    <div>Profile page:: {urlId}</div>
  )
}