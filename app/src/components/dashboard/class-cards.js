import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import Link from 'next/link';
import { Label } from '../ui/label';
import { BookCopy, Megaphone, NotepadText } from 'lucide-react';
import { Separator } from '../ui/separator';

const ClassCard = ({ classData }) => {
    console.log(classData);

    return (
        <Card className="col-span-1 w-[300px] h-[200px] flex flex-col">
            <CardHeader>
                <div className="w-full flex justify-between">
                    <div className="text-left">
                        <CardTitle className="h-[20px] w-full truncate">{classData.class_name}</CardTitle>
                        <Label className="text-xs">{classData.subject}</Label>
                        <Label className="text-xs">
                            {classData.teacher.gender === 'Male' ? 'Mr.' : 'Ms.'} {classData.teacher['first_name']}
                        </Label>
                    </div>
                    <div className="">
                        <Label className="text-xs">
                            {classData.day}
                        </Label>
                        <Label className="text-xs">
                            {classData.start_time}
                        </Label>
                        <Label className="text-xs">
                            {classData.end_time}
                        </Label>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="w-full py-3 flex flex-row justify-evenly items-center">
                <Link href={`/classes/${classData.id}`} className="text-center px-7">
                    <BookCopy className="w-[25px] h-[25px]" />
                </Link>
                <Link href={`/classes/${classData.id}/assignments`} className="text-center px-7 border-r border-l">
                    <NotepadText className="w-[25px] h-[25px]" />
                </Link>
                <Link href={`/classes/${classData.id}/announcements`} className="text-center px-7">
                    <Megaphone className="w-[25px] h-[25px]" />
                </Link>
            </CardContent>
        </Card> 
    );
};

export default ClassCard;