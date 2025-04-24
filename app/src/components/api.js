import axios from 'axios';
import config from "@/config";


export const getAssignmentsForWeek = async (student_id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/assignments/student-week`, {
            params: {
                student_id: student_id
            }
        });
        console.log(res.data);
        return res.data['assignments'];
    }
    catch (error) {
        console.error("Error fetching assignments for week:", error);
    }
}

export const getAssignmentsForWeekTeacher = async (teacher_id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/assignments/teacher-week`, {
            params: {
                teacher_id: teacher_id
            }
        });
        console.log(res.data);
        return res.data['assignments'];
    }
    catch (error) {
        console.error("Error fetching assignments for week:", error);
    }
}

export const getCurrentSemester = async () => {
    try {
        const res = await axios.get(`${config.backendUrl}/current-semester`);
        console.log(res.data);
        return res.data['semester'];
    }
    catch (error) {
        console.error("Error fetching classes by semester:", error);
    }
}

export const deleteStudentFromClass = async (class_id, student_id) => {
    try {
        console.log("Deleting student from class...", student_id, class_id);
        const response = await axios.delete(`${config.backendUrl}/delete-student-from-class`, {
            params: {
                student_id: student_id,
                class_id: class_id
            }
        });
        console.log(response.data);
    }
    catch (error) {
        console.error("Error deleting student from class:", error);
    }
}

export const deleteClass = async (class_id) => {
    try {
        console.log("Deleting class...", class_id);
        const response = await axios.delete(`${config.backendUrl}/delete_class/${class_id}`);
        console.log(response.data);
    }
    catch (error) {
        console.error("Error deleting class:", error);
    }
}

export const deletePayment = async (payment_id) => {
    try {
        console.log("Deleting payment...", payment_id);
        const response = await axios.delete(`${config.backendUrl}/payment`, {params: {payment_id: payment_id}});
        console.log(response.data);
    }
    catch (error) {
        console.error("Error deleting payment:", error);
    }
}