const { Client} = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres:localhost/acme-schools');


client.connect();

const sync = async()=> {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS students;
  DROP TABLE IF EXISTS schools;
  CREATE TABLE schools(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "schoolName" VARCHAR(100) NOT NULL UNIQUE,
    CHECK (char_length("schoolName") > 0)
  );
  CREATE TABLE students(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "studentName" VARCHAR(100) NOT NULL,
    "schoolId" UUID REFERENCES schools(id),
    CHECK (char_length("studentName") > 0)
  );
`;
await client.query(SQL);

const [UCLA, NYU, USC, Berkeley] = await Promise.all([
  createSchool({ schoolName: 'UCLA'}),
  createSchool({ schoolName: 'NYU'}),
  createSchool({ schoolName: 'USC'}),
  createSchool({ schoolName: 'Berkeley'})
]);

 const [moe, lucy, curly] = await Promise.all([
  createStudent({ studentName: 'moe', schoolId: UCLA.id}),
  createStudent({ studentName: 'lucy', schoolId: NYU.id}),
  createStudent({ studentName: 'curly', schoolId: NYU.id})
 ]);

  // await deleteSchool(lucy.id);

  console.log(await readSchools());
  console.log(await readStudents());
};

const createSchool = async({ schoolName }) => {
  return (await client.query('INSERT INTO schools("schoolName") values($1) returning *', [ schoolName])).rows[0]
};

const createStudent = async({ studentName, schoolId }) => {
  return (await client.query('INSERT INTO students("studentName", "schoolId") values($1, $2) returning *', [ studentName, schoolId])).rows[0]
};

const destroyStudent = async(id)=> {
  await client.query('DELETE FROM students WHERE id=$1', [id]);
};

const destroySchool = async(id)=> {
  await client.query('DELETE FROM schools WHERE id=$1', [id]);
};

const readSchools = async()=> {
  return (await client.query('SELECT * from schools')).rows;
};

const readStudents = async()=> {
  return (await client.query('SELECT * from students')).rows;
};

module.exports = {
  sync,
  create: {
    schools: createSchool,
    students: createStudent
  },
  read:{
    schools: readSchools,
    students: readStudents
  },
  destroy: {
    schools: destroySchool,
    students: destroyStudent
  }
};
