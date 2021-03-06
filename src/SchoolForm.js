import React, { useState } from 'react';

const SchoolForm = ({create})=> {
  const [schoolName, setSchoolName ] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    create({schoolName})
    .then(()=> {
      setError('');
      setSchoolName('');
    })
    .catch(ex => setError(ex.response.data.message));
  }
  return (
    <form onSubmit={ onSubmit}>
      <h2>Create School</h2>
      <div>
      {
        error
      }
      </div>
      <input value={schoolName} onChange={ (ev)=> setSchoolName(ev.target.value)}/>
      <button>Create</button>
    </form>
  );
};

export default SchoolForm;
