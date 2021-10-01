//import { useEffect } from "react";
function CourseList(props) {
  const { course, handleDelete, handleEdit, setCurrentCourse } = props;

  return (
    <div>
      {course.map((course) => (
        <li key={course.id} onClick={() => setCurrentCourse(course)}>
          {course.course_name}, {course.course_number}{" "}
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
  );
}

export default CourseList;
