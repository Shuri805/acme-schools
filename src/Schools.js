import React from 'react';

const Schools = ({students, schools}) => {
  return (
    <div>
      <h2>Schools ({schools.length})</h2>
      <ul>
      {
          schools.map( school => {
            const filtered = students.filter( student => student.schoolId === school.id);
            //console.log(filtered);
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

export default Schools;
