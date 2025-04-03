import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNew } from '../api';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content) return;

    mutation.mutate(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Anecdote</h2>
      <div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default AnecdoteForm;
