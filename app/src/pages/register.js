import React, { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import axios from 'axios';
import config from '../config';
import { useRouter } from 'next/router';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { z } from "zod"

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  birth_date: z.string().min(1, "Birth date is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "password must be at least 8 characters long"),
  address: z.string().min(1, "Address is required"),
  guardian: z.string().min(1, "Guardian name is required"),
  guardian_phone: z.string().min(1, "Guardian phone number is required"),
  health_ins: z.string().min(1, "Health insurance is required"),
  health_ins_number: z.string().min(1, "Health insurance number is required"),
  role: z.enum(["Student", "Teacher", "Admin"]),
  grade_level: z.string().min(1, "Grade level is required"),
  })

export function DatePickerDemo() {
  const [date, setDate] = useState(0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate} 
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    address: '',
    guardian: '',
    guardian_phone: '',
    health_ins: '',
    health_ins_number: '',
    role: 'Student',
    grade_level: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const gradeLevels = Array.from({length: 12}, (_, i) => i + 1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      email: "",
      gender: "",
      phone: "",
      passsword: "",
      address: "",
      guardian: "",
      guardian_phone: "",
      health_ins: "",
      health_ins_number: "",
      role: "",
      grade_level: ""
    },
  })

  function handleSignUp(values) {

    if (values.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.post(`${config.backendUrl}/register`, values).then(response => {
      console.log("Successfully registered: " + response.data['message']);
      if (response.data['access_token']) {
        localStorage.setItem('token', response.data['access_token']);
        router.push('/register-classes').then( () => console.log("Redirecting to register classes"));
      } else {
        throw new Error(response.data['message']);
      }
    }).catch( error => {
      console.log(error);
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className = "flex flex-col items-center justify-center min-h-screen">
      <h1>Register</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="First Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input placeholder="Birth Date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Gender" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guardian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian</FormLabel>
              <FormControl>
                <Input placeholder="Guardian" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guardian_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian Phone</FormLabel>
              <FormControl>
                <Input placeholder="Guardian Phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="health_ins"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Insurance</FormLabel>
              <FormControl>
                <Input placeholder="Health Insurance" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="health_ins_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Ins Number</FormLabel>
              <FormControl>
                <Input placeholder="Health Ins Number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Role" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <FormControl>
                <Input placeholder="Grade Level" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
}
