import "./App.css";
import TextInput from "./components/TextInput";
import CourseList from "./components/CourseList";
import useCourse from "./hooks/useCourse";

function App() {
  const {
    courses,
    inputData,
    setInputData,
    editMode,
    submitCourseForm,
    submitEditCourseForm,
    handleDelete,
    handleEdit,
    setCurrentCourse,
  } = useCourse();

  return (
    <div className="App">
      <div>
        <h1>Course List</h1>
        <CourseList
          course={courses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          setCurrentCourse={setCurrentCourse}
        />
      </div>

      <div>
        <h1>Add Course</h1>
        <form onSubmit={submitCourseForm}>
          <TextInput
            inputId="course_name"
            inputLabel="Course Name"
            inputValue={inputData.courseName}
            setInputValue={(value) =>
              setInputData({ ...inputData, courseName: value })
            }
          />

          <TextInput
            inputId="course_numbers"
            inputLabel="Course Number"
            inputValue={inputData.courseNumber}
            setInputValue={(value) =>
              setInputData({ ...inputData, courseNumber: value })
            }
          />

          {!editMode && <button type="submit">Add Course</button>}
          {editMode && (
            <button type="button" onClick={submitEditCourseForm}>
              Edit Course
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
