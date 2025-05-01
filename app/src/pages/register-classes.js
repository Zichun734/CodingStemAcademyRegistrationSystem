import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from '../config';
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/router";
import {getCurrentSemester} from "@/components/api";
import {DataTable} from "@/components/tables/classes/registration/data-table";
import {columns} from "@/components/tables/classes/registration/columns";

export default function RegisterClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [user, setUser] = useState(null);
  const [semester, setSemester] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }
    const user = jwtDecode(token);
    if (user['sub']['role'] !== 'Student') {
      alert("You are not authorized to access this page");
      return;
    }
    setUser(user['sub']);
  }, []);

  useEffect(() => {
    getCurrentSemester().then(semester => {
      setSemester(semester);
    }).catch(error => {
      console.log(error);
    });
  }, [user]);

  useEffect(() => {
    if (!semester) return;

    axios.get(`${config.backendUrl}/classes/semester`, {params: {semester_id: semester.id}})
      .then(response => {
        const classes = response.data['classes'];
        console.log("Classes: ", classes);
        Promise.all(
          classes.map(async (classData) => {
            try {
              const teacher = await axios.get(`${config.backendUrl}/user`, {params: {id: classData.teacher_id}});
              return { ...classData, teacher: teacher.data }; 
            } catch (error) {
              console.error("Error fetching teacher:", error);
              return classData; 
            }
          })
        ).then((updatedClasses) => {
          setClasses(updatedClasses);
        });
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, [semester]);



  const handleClick = () => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    const student_id = user['sub']['id'];
    console.log("Student ID: " + student_id);
    console.log("Selected Classes: " + selectedClasses);

    console.log("Registering for classes: " + selectedClasses + " for student: " + student_id)
    axios.post(`${config.backendUrl}/add_multiple_classes_to_student`, {
      user_id: student_id,
      classes: selectedClasses,
    }).then(response => {
      console.log("Successfully registered for class: " + response.data['message']);
      if (response.data['message'] === 'Student already registered for this class') {
        alert("You are already registered for this class");
      } else {
        console.log("Successfully registered for class: " + response.data['message']);
        router.push('/dashboard').then(() => console.log("Redirecting to dashboard"));
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const handleCheckboxChange = (classId) => {
    setSelectedClasses(prevSelectedClasses => {
      if (prevSelectedClasses.includes(classId)) {
        return prevSelectedClasses.filter(id => id !== classId);
      } else {
        return [...prevSelectedClasses, classId];
      }
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1>Available Classes</h1>
      <DataTable data={classes} columns={columns} />
      <br />
      <button onClick={() => handleClick()}>Register Classes</button>
    </div>
  );
}
