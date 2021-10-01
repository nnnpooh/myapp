import "./App.css";
import supabase from "./db";
import React, { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import CourseList from "./components/CourseList";

function App() {
  const [courses, setCourses] = useState([]);
  const [inputData, setInputData] = useState({
    courseName: "",
    courseNumber: "",
  });
  const [currentCourse, setCurrentCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);

  async function loadData() {
    let { data } = await supabase.from("course").select("*");
    setCourses(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitCourseForm(event) {
    event.preventDefault();

    const courseName = inputData.courseName;
    const courseNumber = inputData.courseNumber;
    if (courseNumber !== "" && courseName !== "") {
      const dataRow = {
        created_at: new Date(),
        updated_at: new Date(),
        course_number: courseNumber,
        course_name: courseName,
        type: "วิชาเลือก",
      };

      const { data, error } = await supabase.from("course").insert([dataRow]);
      console.log({ data, error });

      loadData();
      setInputData({ ...inputData, courseName: "", courseNumber: "" });
    }
  }

  async function submitEditCourseForm() {
    const courseId = currentCourse.id;
    const courseName = inputData.courseName;
    const courseNumber = inputData.courseNumber;
    const { data, error } = await supabase
      .from("course")
      .update({ course_name: courseName, course_number: courseNumber })
      .eq("id", courseId);
    console.log({ data, error });

    await loadData();
    setInputData({ ...inputData, courseName: "", courseNumber: "" });
    setEditMode(false);
  }

  async function handleDelete(id) {
    const { data, error } = await supabase.from("course").delete().eq("id", id);
    console.log({ data, error });
    await loadData();
  }

  async function handleEdit(id) {
    const coursesFiltered = courses.find((el) => el.id === id);
    setCurrentCourse(coursesFiltered);

    setInputData({
      ...inputData,
      courseName: coursesFiltered.course_name,
      courseNumber: coursesFiltered.course_number,
    });
    setEditMode(true);
  }

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
