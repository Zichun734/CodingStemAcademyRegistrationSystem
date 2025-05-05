import Link from "next/link";
import {useEffect, useState} from "react";
import { jwtDecode } from 'jwt-decode'
import StudentDash from "@/components/StudentDash";
import TeacherDash from "@/components/TeacherDash";
import AdminDash from "@/components/dashboard/AdminDash";
import {Layout, LayoutWithCalendar} from "@/app/layout";
import { SideCalendar } from "@/components/sidebars/DashboardSidebar";

export default function Dashboard() {
  const [role, setRole] = useState('');


  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token found in local storage");
        window.location.href = "/";
      } else {
        const user = jwtDecode(token);
        console.log(user['sub']);
        setRole(user['sub']['role']);
      }
    };

    fetchRole().then(() => console.log("Role set"));
  }, []);
  if (role === 'Admin') {
    return (
      <Layout>
        <AdminDash />
      </Layout>
    );
  }

  return (
    <LayoutWithCalendar>
      {role === 'Student' && <StudentDash />}
      {role === 'Teacher' && <TeacherDash />}
    </LayoutWithCalendar>
  );
}
