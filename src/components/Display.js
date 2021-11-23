function Display(props) {
  function handleDelete(courseNumber) {
    props.setData((prev) => {
      const temp = [...prev];
      return temp.filter((el) => el.courseNumber !== courseNumber);
    });
  }
  function handleEdit(course) {
    props.setEditMode(true);
    props.setEditCourse(course);
  }

  return (
    <div>
      <ul>
        {props.data.map((el) => (
          <li key={el.courseName}>
            {el.courseName} {el.courseNumber}
            <span onClick={() => handleDelete(el.courseNumber)}> [X]</span>
            {!props.editMode && (
              <span onClick={() => handleEdit(el)}> [Edit]</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Display;
