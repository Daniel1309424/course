const Persons = ({ persons, handleDelete }) => {
  return (
    <ul style={{ padding: 0 }}>
      {persons.map(person => (
        <li key={person.id} style={{ textAlign: 'left' }}>
          {person.name} {person.number} 
          <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
