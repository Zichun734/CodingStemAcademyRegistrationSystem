import axios from 'axios';
import config from "@/config";

export const getUser = async (id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/user`, {
            params: {
                id: id
            }
        });
        console.log(res.data);
        return res.data['user'];
    }
    catch (error) {
        console.error("Error fetching user:", error);
    }
}

export const getStudentByName = async (first_name, last_name) => {
    try {
        const res = await axios.get(`${config.backendUrl}/users/by-name`, {
            params: {
                first_name: first_name,
                last_name: last_name
            }
        });
        console.log(res.data);
        return res.data['student'];
    }
    catch (error) {
        console.error("Error fetching student by name:", error);
    }
}

export const getClassesBySemester = async (semester_id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/classes/semester`, {
            params: {
                semester_id: semester_id
            }
        });
        console.log(res.data);
        return res.data['classes'];
    }
    catch (error) {
        console.error("Error fetching classes by semester:", error);
    }
}

export const getAllClassesForTeacher = async (id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/all-classes-by-teacher`, {
            params: {
                teacher_id: id
            }
        });
        console.log(res.data);
        return res.data['classes'];
    }
    catch (error) {
        console.error("Error fetching all classes:", error);
    }
};

export const getAssignmentsForStudent = async (student_id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/assignments/student`, {
            params: {
                student_id: student_id
            }
        });
        console.log(res.data);
        return res.data['assignments'];
    }
    catch (error) {
        console.error("Error fetching assignments for student:", error);
    }
}


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

export const getAssignmentsForTeacher = async (teacher_id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/assignments/teacher`, {
            params: {
                teacher_id: teacher_id
            }
        });
        console.log(res.data);
        return res.data['assignments'];
    }
    catch (error) {
        console.error("Error fetching assignments for teacher:", error);
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

export const getSemesters = async () => {
    try {
        const res = await axios.get(`${config.backendUrl}/semesters`);
        console.log(res.data);
        return res.data['semesters'];
    }
    catch (error) {
        console.error("Error fetching semesters:", error);
    }
}

export const getAllClassesForStudent = async (id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/all-classes-by-student`, {
            params: {
                student_id: id
            }
        });
        console.log(res.data);
        return res.data['classes'];
    }
    catch (error) {
        console.error("Error fetching all classes:", error);
    }
}

export const getSemester = async (id) => {
    try {
        const res = await axios.get(`${config.backendUrl}/semester`, {
            params: {
                id: id
            }
        });
        console.log(res.data);
        return res.data['semester'];
    }
    catch (error) {
        console.error("Error fetching semester:", error);
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

export const postSemester = async (semester) => {
    try {
        console.log("Creating semester...", semester);
        const response = await axios.post(`${config.backendUrl}/semester`, semester);
        console.log(response.data);
    }
    catch (error) {
        console.error("Error creating semester:", error);
    }
}


export const updateSemester = async (semester) => {
    try {
        console.log("Updating semester...", semester);
        const response = await axios.put(`${config.backendUrl}/semester`, semester);
        console.log(response.data);
    }
    catch (error) {
        console.error("Error updating semester:", error);
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

export const deleteSemester = async (semester_id) => {
    try {
        console.log("Deleting semester...", semester_id);
        const response = await axios.delete(`${config.backendUrl}/semester`, {params: {semester_id: semester_id}});
        console.log(response.data);
    }
    catch (error) {
        console.error("Error deleting semester:", error);
    }
}