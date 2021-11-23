import './App.css';
import Form from './components/Form';
import Display from './components/Display';
import { useState } from 'react';
const init = [
  {
    courseName: 'Thermo',
    courseNumber: '123456',
  },
  {
    courseName: 'OR',
    courseNumber: '875656',
  },
  {
    courseName: 'Plant',
    courseNumber: '343444',
  },
];
function App() {
  const [courses, setCourses] = useState(init);
  const [editMode, setEditMode] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  // console.log({ editMode, editCourse });

  return (
    <div className='App'>
      <h1>My App</h1>

      <Display
        data={courses}
        setData={setCourses}
        editMode={editMode}
        setEditMode={setEditMode}
        setEditCourse={setEditCourse}
      />
      <Form
        setData={setCourses}
        editMode={editMode}
        setEditMode={setEditMode}
        editCourse={editCourse}
      />
    </div>
  );
}

export default App;
