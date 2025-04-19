import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import axios from "axios"
import config from "@/config"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ClassForm } from "@/app/forms/class/edit-form"
import { ModifyPaymentForm } from "../forms/payment/edit-form"



export function PaymentModifySheet({children, paymentData}) {
    
    React.useEffect(() => {
    }, []);


  return (
    <Sheet>
        {children}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit class</SheetTitle>
          <SheetDescription>
            Make changes to the class here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetContent>
            <div className="grid gap-4 p-8">
              <ModifyPaymentForm paymentData={paymentData} />
            </div>
        </SheetContent>
      </SheetContent>
    </Sheet>
  )
}
