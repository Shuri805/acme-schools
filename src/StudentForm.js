import React, { useState } from 'react';

const StudentForm = ({create})=> {
  const [studentName, setStudentName ] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    create({studentName})
    .then(()=> {
      setError('');
      setStudentName('');
    })
    .catch(ex => setError(ex.response.data.message));
  }
  return (
    <form onSubmit={ onSubmit}>
      <h2>Create Student</h2>
      <div>
      {
        error
      }
      </div>
      <input value={studentName} onChange={ (ev)=> setStudentName(ev.target.value)}/>
      <button>Create</button>
    </form>
  );
};

export default StudentForm;
