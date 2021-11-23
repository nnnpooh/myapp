import { useState, useEffect } from 'react';

function Form(props) {
  const [courseName, setCourseName] = useState('');
  const [courseNumber, setCourseNumber] = useState('');

  useEffect(() => {
    if (props.editMode) {
      setCourseName(props.editCourse.courseName);
      setCourseNumber(props.editCourse.courseNumber);
    }
  }, [props.editMode]);

  function handleSubmit() {
    props.setData((prev) => {
      const temp = [...prev];
      temp.push({
        courseName: courseName,
        courseNumber: courseNumber,
      });
      return temp;
    });

    setCourseName('');
    setCourseNumber('');
  }

  function handleCancel() {
    props.setEditMode(false);
    setCourseName('');
    setCourseNumber('');
  }

  function handleSubmitEdit() {
    props.setData((prev) => {
      let temp = [...prev];

      temp = temp.filter(
        (el) => el.courseNumber !== props.editCourse.courseNumber
      );

      temp.push({
        courseName: courseName,
        courseNumber: courseNumber,
      });

      return temp;
    });

    setCourseName('');
    setCourseNumber('');

    props.setEditMode(false);
  }
  // console.log(props);
  return (
    <div>
      <input
        type='text'
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <p>{courseName}</p>

      <input
        type='number'
        value={courseNumber}
        onChange={(e) => setCourseNumber(e.target.value)}
      />
      <p>{courseNumber}</p>

      {!props.editMode && <button onClick={handleSubmit}>Submit</button>}
      {props.editMode && (
        <button onClick={handleSubmitEdit}>Submit Edit</button>
      )}
      {props.editMode && <button onClick={handleCancel}>Cancel Edit</button>}
    </div>
  );
}

export default Form;
