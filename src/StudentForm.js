import React, { useState } from 'react';

const StudentForm = ({create, schools})=> {
  const [studentName, setStudentName ] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [error, setError] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    create({studentName, schoolId})
    .then(()=> {
      setError('');
      setStudentName('');
      setSchoolId('');
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
      <select value={ schoolId } onChange={ (ev)=> setSchoolId(ev.target.value)}>
        <option value=''> -- choose a school -- </option>
        {
          schools.map( school => {
            return (
              <option value={ school.id } key={ school.id }>{school.schoolName}
              </option>
            )
          })
        }
      </select>
      <button disabled={!schoolId}> Create</button>
    </form>
  );
};

export default StudentForm;
