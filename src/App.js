import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schools = ({students, schools}) => {
  return (
    <div>
      <h2>Schools ({schools.length})</h2>
      <ul>
      {
          schools.map( school => {
            const filtered = students.filter( student => student.schoolId === school.id);
            console.log(filtered);
            return (
              <li key ={school.id}>
                {school.schoolName}
                <ul>
                  {
                    filtered.map( student => {
                      return (
                        <li key={ student.id }>
                          { student.studentName }
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const Students = ({students, schools}) => {
  return (
    <div>
      <h2>Students ({students.length})</h2>
      <ul>
      {
          students.map( student => {
            const filtered = schools.filter( school => school.studentId === student.id);
            console.log(filtered);
            return (
              <li key ={student.id}>
                {student.studentName}
                <ul>
                  {
                    filtered.map( school => {
                      return (
                        <li key={ school.id }>
                          { school.schoolName }
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

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
