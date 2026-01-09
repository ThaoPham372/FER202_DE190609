// initial one student object with id, name, avatar, age, grade
// print information of student of h1, p, img
function About() {
  const student = {
    id: 1,
    name: 'Thao Pham',
    avatar: '/images/16.jpg',
    age: 20,
    grade: 'A+',
  };
  console.log(student);
  return (
    <>
      <h1>This is the About Me Page</h1>
      <p>ID : {student.id}</p>
      <p>Name : {student.name}</p>
      <p>Age : {student.age}</p>
      <p>Grade : {student.grade}</p>
      <p>
        {' '}
        <img src={student.avatar} alt="avatar" width={150} height={200} />
      </p>
      <p>Description : This is my avatar </p>
    </>
  );
}
export default About;
