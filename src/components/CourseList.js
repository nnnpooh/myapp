//import { useEffect } from "react";
function CourseList(props) {
  const { courses, setCurrentCourse, deleteData, setEditMode, editMode } =
    props;

  async function handleDelete(id) {
    await deleteData(id);
  }

  async function handleEdit(id) {
    const coursesFiltered = courses.find((el) => el.id === id);
    setCurrentCourse(coursesFiltered);
    setEditMode(true);
  }

  return (
    <div>
      {courses.map((course) => (
        <li key={course.id} onClick={() => setCurrentCourse(course)}>
          {course.course_name}, {course.course_number}{" "}
          {!editMode && (
            <span
              onClick={() => {
                handleDelete(course.id);
              }}
            >
              [X]
            </span>
          )}
          <span onClick={() => handleEdit(course.id)}>[Edit]</span>
        </li>
      ))}
    </div>
  );
}

export default CourseList;
