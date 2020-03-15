import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Students from './Students';
import Schools from './Schools';
import SchoolForm from './SchoolForm';
import StudentForm from './StudentForm';

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

  const createSchool = async(school)=> {
    const created = (await axios.post('/api/schools', school)).data;
    setSchools([...schools, created]);
    // console.log(created);
  };

  const createStudent = async(student)=> {
    const created = (await axios.post('/api/students', student)).data;
    setStudents([...students, created]);
    // console.log(student);
  };

  const destroyStudent = async(id)=>{
    await axios.delete(`/api/students/${id}`);
    setStudents(students.filter(student => student.id !== id));
    //console.log(id);
  };

  const destroySchool = async(id)=>{
    await axios.delete(`/api/schools/${id}`);
    setSchools(schools.filter(school => school.id !== id));
    // console.log(id);
  };

  return (
    <div>
      <h1>Acme Schools</h1>
      <div className='left-right'>

      <SchoolForm
        create={ createSchool }
      />

      <StudentForm
        create={ createStudent }
        schools={ schools}
      />

      <Students
        students= { students }
        schools= { schools }
        destroy={ destroyStudent }
      />

      <Schools
        schools={ schools }
        students={ students }
        destroy= {destroySchool}
      />
      </div>
    </div>
  );
};

export default App;
