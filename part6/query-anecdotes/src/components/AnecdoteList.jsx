import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAll, updateVotes } from '../api';

const AnecdoteList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

  const handleVote = (id, votes) => {
    mutation.mutate({ id, votes: votes + 1 });
  };

  if (isLoading) return <div>Loading anecdotes...</div>;
  if (isError) return <div>Error fetching anecdotes!</div>;

  return (
    <div>
      <h2>Anecdotes</h2>
      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content} has {anecdote.votes} votes</p>
          <button onClick={() => handleVote(anecdote.id, anecdote.votes)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
