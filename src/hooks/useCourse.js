import { useState, useEffect } from "react";
import supabase from "../db";

function useCourse() {
  const [courses, setCourses] = useState([]);

  async function loadData() {
    let { data } = await supabase.from("course").select("*");
    setCourses(data);
  }

  async function deleteData(id) {
    const { data, error } = await supabase.from("course").delete().eq("id", id);
    console.log({ data, error });
    await loadData();
  }

  async function addData(dataRow) {
    const { data, error } = await supabase.from("course").insert([dataRow]);
    console.log({ data, error });
    await loadData();
  }

  async function updateData(id, dataRow) {
    const { data, error } = await supabase
      .from("course")
      .update(dataRow)
      .eq("id", id);
    console.log({ data, error });
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    courses,
    setCourses,
    loadData,
    deleteData,
    addData,
    updateData,
  };
}

export default useCourse;
