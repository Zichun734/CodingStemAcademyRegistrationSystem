import React, {useEffect} from 'react';
import {Layout} from "@/app/layout";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/router";
import {Label} from "@/components/ui/label";


export default function Semesters() {
  const router = useRouter()
  const [semesters, setSemesters] = React.useState([]);
  const [user, setUser] = React.useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/').then(() => {
        console.log('Redirected to home page')
      })
    } else {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken['sub']);
      console.log("Decoded token:", decodedToken);
    }
  }, []);

  useEffect(() => {
  }, [user])

  return (
    <Layout>
      <div className="container w-[800px] p-12">
      <Label>
        <h1 className="text-3xl font-bold">Semesters</h1>
        <p className="text-gray-500">Manage Semesters in the system</p>
      </Label>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      ) : user['role'] === 'Admin' ? (
        <DataTable columns={columns} data={semesters} />
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold">You are not authorized to view this page</h1>
        </div>
      )}
      </div>
    </Layout>
  );

}
