import React, { useState } from 'react';

const ChefForm = ({create})=> {
  const [schoolName, setSchoolName ] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    create({schoolName})
  }
  return (
    <form onSubmit={ onSubmit}>
      <h2>Create School</h2>
      <input value={schoolName} onChange={ (ev)=> setSchoolName(ev.target.value)}/>
      <button>Create</button>
    </form>
  );
};

export default ChefForm;
