import React from 'react';

const Students = ({students, schools, destroy}) => {
  return (
    <div>
      <h2>Students ({students.length})</h2>
      <ul>
      {
          students.map( student => {
            const school = schools.find( school => school.id === student.schoolId);
            console.log(school);
            return (
              <li key ={student.id}>
                {student.studentName}
                <button onClick={ ()=> destroy(student.id)}>x</button>
                at {!!school && school.schoolName}

              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Students;
