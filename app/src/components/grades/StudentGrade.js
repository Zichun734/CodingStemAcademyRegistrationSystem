import React, {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '@/config';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function StudentGrade() {
    const [user, setUser] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [className, setClassName] = useState(null);
    const router = useRouter();
    const { class_id } = router.query;
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(jwtDecode(token)['sub']);
    }, []);

    useEffect(() => {
        if (!user || !class_id) { return; }
        const fetchAssignments = async () => {
            try {
                const classRes = await axios.get(`${config.backendUrl}/class/${class_id}`);
                console.log(classRes.data);
                const classData = classRes.data['class'];
                setClassName(classData['name']);
                const assignmentRes = await axios.get(`${config.backendUrl}/assignments`, {
                    params: {
                        class_id: class_id,
                    }
                });
                console.log(assignmentRes.data);
                const assignments = assignmentRes.data['assignments'];
                const updatedAssignments = await Promise.all(assignments.map(async (assignment) => {
                    const scoreRes = await axios.get(`${config.backendUrl}/scores/${assignment.id}/student/${user.id}`)
                    console.log(scoreRes);
                    const score = scoreRes.data['score'];
                    return { ...assignment, score: score };
                }));
                console.log(updatedAssignments);
                setAssignments(updatedAssignments);
            } catch (error) {
                console.error('Error fetching classes:', error);
            } finally {
                setLoading(false);
        }}

        fetchAssignments();
    }, [class_id, user]);;

    if (loading) {
        return (
            <div className="container mx-auto flex flex-col p-4 gap-4">
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <div className="flex flex-row justify-between items-center">
                    <Skeleton className="w-[200px] h-[50px]" />
                    <Skeleton className="w-[200px] h-[50px]" />
                </div>
            </div>
        );
    }
    

    return (
        <div className="container mx-auto flex flex-col p-4 gap-4">
            <h1 className="text-2xl font-bold">{className} Grades</h1>
            <Card>

            </Card>
        </div>
    );
}