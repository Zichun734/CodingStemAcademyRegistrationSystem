"use client"
import { MoreHorizontal, Trash } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { deleteStudentFromClass } from "@/components/api"


export const columns = [
    {
        accessorKey: "teacher_name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Teacher</span>
                </Button>
            )
        }
    },
    {
        accessorKey: "class_name",
        header: "Class Name",
    },
    {
        accessorKey: "subject",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Subject</span>
                </Button>
            )
        }
    },
    {
        accessorKey: "day",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Day</span>
                </Button>
            )
        }
    },
    {
        accessorKey: "start_time",
        header: "Start Time",
    },
    {
        accessorKey: "end_time",
        header: "End Time",
    },
]
