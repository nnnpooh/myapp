import './App.css';
import supabase from './db';
import React, { useState, useEffect } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseNumber, setcourseNumber] = useState('');

  async function loadData() {
    let { data } = await supabase.from('course').select('*');
    setCourses(data);
  }
  // Asyncronous process
  useEffect(() => {
    loadData();
  }, []);

  function handleCourseName(event) {
    setCourseName(event.target.value);
  }

  function handleCourseNumber(event) {
    setcourseNumber(event.target.value);
  }

  async function submitCourseForm(event) {
    event.preventDefault();

    if (courseNumber !== '' && courseName !== '') {
      const dataRow = {
        created_at: new Date(),
        updated_at: new Date(),
        course_number: courseNumber,
        course_name: courseName,
        type: 'วิชาเลือก',
      };

      const { data, error } = await supabase.from('course').insert([dataRow]);
      loadData();

      setcourseNumber('');
      setCourseName('');
    }
  }

  return (
    <div className='App'>
      <div>
        <h1>Course List</h1>
        {courses.map((course) => (
          <li key={course.id}>
            {course.course_name}, {course.course_number}
          </li>
        ))}
      </div>

      <div>
        <h1>Add Course</h1>

        <form onSubmit={submitCourseForm}>
          <label htmlFor='course_name'>Course Name</label>
          <input
            id='course_name'
            value={courseName}
            onChange={handleCourseName}
            type='text'
          ></input>
          <label htmlFor='course_number'>Course Number</label>
          <input
            id='course_number'
            type='text'
            value={courseNumber}
            onChange={handleCourseNumber}
          ></input>
          <button type='submit'>Add Course</button>
        </form>
      </div>
    </div>
  );
}

export default App;

