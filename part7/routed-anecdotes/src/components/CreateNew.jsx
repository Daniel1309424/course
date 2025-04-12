import { useField } from '../hooks/useField';

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
  };

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
