import { useRouter } from 'next/router';
import {Layout} from "@/app/layout";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import config from "@/config";
import {Card} from "@/components/ui/card";
import {DataTable} from "@/components/tables/submissions/data-table";
import {columns} from "@/components/tables/submissions/columns";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { SubmissionForm } from '@/components/forms/submission/form';

const ClassPage = () => {
  const router = useRouter();
  const { assignment_id } = router.query; // Access the dynamic ID from the URL
  const [assignmentData, setAssignmentData] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/').then(() => {console.log("Returning logged out user to main")})
    }
    const user = jwtDecode(token);
    setUser(user['sub']);
  }, []);

  useEffect(() => {
    // Fetch assignment information here using Axios 
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/assignment`, {
          params: { id: assignment_id },
        });
        setAssignmentData(response.data.assignment);
      } catch (error) {
        console.error("Error fetching assignment data:", error);
      }
    };

    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/assignments-submissions`, {
          params: { assignment_id },
        });
        return response.data.submissions;
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    }

    const fetchStudents = async (submissionsData) => {
      try {
        for (const submission of submissionsData) {
          const response = await axios.get(`${config.backendUrl}/user`, {
            params: { id: submission.student_id },
          });
          const student = response.data.user;
          submission.student_name = `${student.first_name} ${student.last_name}`;
        }
        return submissionsData;
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }

    if (assignment_id) {
      fetchAssignment();
      fetchSubmissions()
      .then((submissions) => {
        fetchStudents(submissions)
        .then((res) => {
          console.log("Submissions with student names:", res);
          setSubmissions(res);
        })
      })
    }
  }, [assignment_id])

  return (
    <Layout>
        <div className="w-[600px] container p-8 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Assignment Details</h1>
            {user && user.role === "Student" && (
              <div className="flex justify-end">
                <Popover>
                  <PopoverTrigger><Button type="default">Make Submission</Button></PopoverTrigger>
                  <PopoverContent>
                    <SubmissionForm assignment_id={assignment_id} user_id={user.id} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <h2 className="text-xl font-semibold">{assignmentData.title}</h2>
              <div className="flex flex-row items-center justify-end space-x-4">
                <h3 className="text-lg font-semibold">Due Date: </h3>
                <p className="">{new Date(assignmentData.due_date).toLocaleDateString("en-US", { timeZone: "UTC" })}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="">{assignmentData.description}</p>
          </Card>
          {user && user.role === "Teacher" && (
            <div>
              <h2 className="text-xl font-semibold mt-8">Submissions</h2>
              <DataTable columns={columns} data={submissions} />
            </div>
          )}

        </div>
    </Layout>
  );
};

export default ClassPage;
