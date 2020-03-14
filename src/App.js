import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Students from './Students'
import Schools from './Schools'

const App = () => {
  const [ schools, setSchools] = useState([]);
  const [ students, setStudents] = useState([]);
  useEffect(()=> {
    Promise.all([
      axios.get('/api/students'),
      axios.get('/api/schools')
    ])
    .then ( responses => {
      setStudents(responses[0].data);
      setSchools(responses[1].data);
    })
  },[]);
  return (
    <div>
      <h1>Acme Schools</h1>
      <Students students= { students } schools={ schools } />
      <Schools schools={ schools } students={ students }/>
    </div>
  );
};

export default App;
