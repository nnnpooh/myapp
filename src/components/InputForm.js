import TextInput from "./TextInput";
import { useEffect, useState } from "react";

function InputForm(props) {
  const { addData, currentCourse, setEditMode, updateData, editMode } = props;

  const [inputData, setInputData] = useState({
    courseName: "",
    courseNumber: "",
  });

  function resetInputForm() {
    setInputData({ ...inputData, courseName: "", courseNumber: "" });
  }
  async function submitFormAdd(event) {
    event.preventDefault();

    if (inputData.courseNumber !== "" && inputData.courseName !== "") {
      const dataRow = {
        created_at: new Date(),
        updated_at: new Date(),
        course_number: inputData.courseNumber,
        course_name: inputData.courseName,
        type: "วิชาเลือก",
      };

      await addData(dataRow);
      resetInputForm();
    }
  }

  async function submitFormEdit() {
    const courseId = currentCourse.id;
    const dataRowUpdate = {
      course_name: inputData.courseName,
      course_number: inputData.courseNumber,
    };
    await updateData(courseId, dataRowUpdate);
    setEditMode(false);
    resetInputForm();
  }

  function cancelFormEdit() {
    setEditMode(false);
    resetInputForm();
  }

  useEffect(() => {
    if (currentCourse && editMode) {
      setInputData((prev) => {
        return {
          ...prev,
          courseName: currentCourse.course_name,
          courseNumber: currentCourse.course_number,
        };
      });
    }
  }, [editMode, currentCourse]);

  return (
    <form onSubmit={submitFormAdd}>
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
        <div>
          <button type="button" onClick={submitFormEdit}>
            Edit Course
          </button>
          <button type="button" onClick={cancelFormEdit}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

export default InputForm;
