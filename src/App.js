import './App.css';
import supabase from './db';
import React, { useState, useEffect } from 'react';

function App() {
  const [course, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseNumber, setcourseNumber] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [editMode, setEditMode] = useState(false);

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

  async function handleDelete(id) {
    console.log(id);

    const { data, error } = await supabase.from('course').delete().eq('id', id);

    await loadData();
  }

  async function handleEdit(id) {
    setEditMode(true);
    let { data: course, error } = await supabase.from('course').select('*');

    const courseData = course[0];

    setCourseName(courseData.course_name);
    setcourseNumber(courseData.course_number);
    setCourseId(courseData.id);
  }

  async function submitEditCourseForm() {
    console.log(courseId);
    const { data, error } = await supabase
      .from('course')
      .update({ course_name: courseName, course_number: courseNumber })
      .eq('id', courseId);

    await loadData();

    setCourseName('');
    setcourseNumber('');
    setEditMode(false);
  }

  return (
    <div className='App'>
      <div>
        <h1>Course List</h1>
        {course.map((course) => (
          <li key={course.id}>
            {course.course_name}, {course.course_number}{' '}
            <span
              onClick={() => {
                handleDelete(course.id);
              }}
            >
              [X]
            </span>
            <span onClick={() => handleEdit(course.id)}>[Edit]</span>
          </li>
        ))}
      </div>

      <div>
        <h1>Add Course</h1>

        <form onSubmit={submitCourseForm}>
          <div>
            <label htmlFor='course_name'>Course Name</label>
            <input
              id='course_name'
              value={courseName}
              onChange={handleCourseName}
              type='text'
            ></input>
          </div>
          <div>
            <label htmlFor='course_number'>Course Number</label>
            <input
              id='course_number'
              type='text'
              value={courseNumber}
              onChange={handleCourseNumber}
            ></input>
          </div>
          {!editMode && <button type='submit'>Add Course</button>}
        </form>
        {editMode && (
          <button onClick={submitEditCourseForm}>Edit Course</button>
        )}
      </div>
    </div>
  );
}

export default App;
