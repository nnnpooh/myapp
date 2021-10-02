import "./App.css";
import CourseList from "./components/CourseList";
import useCourse from "./hooks/useCourse";
import InputForm from "./components/InputForm";
import { useState } from "react";

function App() {
  const { courses, loadData, deleteData, addData, updateData } = useCourse();
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const courseListProps = {
    courses,
    setCurrentCourse,
    deleteData,
    setEditMode,
    loadData,
    editMode,
  };

  const InputFormProps = {
    addData,
    currentCourse,
    setEditMode,
    updateData,
    editMode,
  };
  return (
    <div className="App">
      <div>
        <h1>Course List</h1>
        <CourseList {...courseListProps} />
      </div>

      <div>
        <h1>Add Course</h1>
        <InputForm {...InputFormProps} />
      </div>
    </div>
  );
}

export default App;
