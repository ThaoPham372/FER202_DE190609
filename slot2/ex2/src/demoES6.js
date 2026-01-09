const x = 5;
//console.log("The value of x is:", x);
console.log(`The value of x is: ${x}`);
//check if x is positive or negative
if (x >= 0) {
  console.log(`${x} is positive`);
} else {
  console.log(`${x} is negative`);
}

//write a function with 2 parameters name and age and print it
const printNameAge = (name, age) => {
  console.log(`My name is ${name}, I am ${age} years old`);
};
printNameAge('Thao Pham', 20);

//write a function with 2 parameters name and age and print it
const greet = (name, age) => {
  return `Hello, my name is ${name}, I am ${age} years old, Nice to meet you`;
};
console.log(greet('Thao Pham', 20));

// default age = 18
const greetWithDefaultAge = (name, age = 18) => {
  return `Hello, my name is ${name}, I am ${age} years old`;
};
console.log(greetWithDefaultAge('Thao Pham'));

//write a function to calculate the square of a number x
const square = (x) => {
  return x * x;
};
console.log(`The square of ${x} is ${square(x)}`);

// Write a function print object student with name, age, grade and write a function to print each student
const printStudent = ({ id, name, age, grade }) => {
  console.log(
    `Student ID: ${id}, My name is ${name}, I am ${age} years old, I am a ${grade} student`,
  );
};

// initial list of students and call function print each student in list, include 10 students
const students = [
  { id: 1, name: 'Thao Pham', age: 20, grade: 'A+' },
  { id: 2, name: 'Student 2', age: 19, grade: 'A' },
  { id: 3, name: 'Student 3', age: 21, grade: 'B+' },
  { id: 4, name: 'Student 4', age: 22, grade: 'B' },
  { id: 5, name: 'Student 5', age: 20, grade: 'A-' },
  { id: 6, name: 'Student 6', age: 23, grade: 'C+' },
  { id: 7, name: 'Student 7', age: 18, grade: 'A' },
  { id: 8, name: 'Student 8', age: 19, grade: 'B' },
  { id: 9, name: 'Student 9', age: 21, grade: 'C' },
  { id: 10, name: 'Student 10', age: 22, grade: 'B+' },
];

// 1) In từng student bằng forEach + hàm printStudent
students.forEach(printStudent);

// 2) Tạo mảng mô tả student (dùng map, không in trùng)
const studentDescriptions = students.map(
  ({ id, name, age, grade }) =>
    `Student ID: ${id}, My name is ${name}, I am ${age} years old, I am a ${grade} student`,
);
console.log(studentDescriptions);

// 3) Ví dụ rest / spread
const [student1, student2, ...restStudents] = students;
console.log('Student 1:', student1);
console.log('Student 2:', student2);
console.log('Rest of the students:', restStudents);

const newStudent = { id: 11, name: 'Student 11', age: 20, grade: 'A+' };
const allStudents = [...restStudents, newStudent];
allStudents.forEach(printStudent);