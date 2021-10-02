import { useState, useEffect } from "react";
import supabase from "../db";

function useCourse() {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [inputData, setInputData] = useState({
    courseName: "",
    courseNumber: "",
  });
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
  return {
    courses,
    setCourses,
    inputData,
    setInputData,
    editMode,
    setEditMode,
    loadData,
    submitCourseForm,
    submitEditCourseForm,
    handleDelete,
    handleEdit,
    currentCourse,
    setCurrentCourse,
  };
}

export default useCourse;
