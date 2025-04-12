import { useParams, Link } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = parseInt(useParams().id)
  const anecdote = anecdotes.find(a => a.id === id)

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info} target="_blank" rel="noopener noreferrer">{anecdote.info}</a></p>
      <Link to="/">back to anecdotes</Link>
    </div>
  );
};

export default Anecdote
