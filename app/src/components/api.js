import axios from 'axios';
import config from "@/config";


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