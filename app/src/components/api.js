import axios from 'axios';
import config from "@/config";


export const deleteStudentFromClass = async (class_id, student_id) => {
    try {
        const response = await axios.delete(`${config.backendUrl}/delete-student-from-class`, {
            params: {
                student_id: student_id,
                class_id: class_id
            }
        });
        console.log(response.data);
        if (response.data.success) {
            alert("Student deleted from class successfully");
            // Optionally, you can refresh the data or redirect the user
        } else {
            alert("Failed to delete student from class");
        }
    }
    catch (error) {
        console.error("Error deleting student from class:", error);
    }
}
