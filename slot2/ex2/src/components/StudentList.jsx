import listOfStudent from '../listOfStudent.js';
import About from './About.jsx';
import './StudentList.css';

function StudentList() {
  return (
    <>
      <h1 style={{ color: '#ff69b4' }}>This is the About Me Page</h1>
      <p style={{ color: '#ff69b4' }}>
        Welcome! Below is the student card list.
      </p>
      <div className="student-grid">
        {listOfStudent.map((student) => (
          <About key={student.id} student={student} />
        ))}
      </div>
    </>
  );
}

export default StudentList;
