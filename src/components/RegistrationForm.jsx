"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationForm() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Using useState instead of react-hook-form since it's not available per the instructions
   const [formData, setFormData] = useState({
      organisationName: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
      categorisation: "",
      registeredOnMarketplace: null,
      interests: "",
      permissionForFutureEvents: null,
   });

   const handleChange = (name, value) => {
      if (name === "registeredOnMarketplace") {
         setFormData({
            ...formData,
            registeredOnMarketplace: value === "Yes",
         });
      } else if (name === "permissionForFutureEvents") {
         setFormData({
            ...formData,
            permissionForFutureEvents: value === "I accept",
         });
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   const validateForm = () => {
      const errors = [];

      if (!formData.organisationName.trim()) {
         errors.push("Organization Name is required");
      }
      if (!formData.categorisation) {
         errors.push("Category is required");
      }
      if (formData.registeredOnMarketplace === null) {
         errors.push("Solar Marketplace registration status is required");
      }
      if (!formData.firstName.trim()) {
         errors.push("First Name is required");
      }
      if (!formData.lastName.trim()) {
         errors.push("Last Name is required");
      }
      if (!formData.email.trim()) {
         errors.push("Email is required");
      }
      if (!formData.phone.trim()) {
         errors.push("Phone is required");
      }
      if (!formData.gender) {
         errors.push("Gender is required");
      }
      if (!formData.interests.trim()) {
         errors.push("Interests field is required");
      }
      if (formData.permissionForFutureEvents === null) {
         errors.push("Permission for future events is required");
      }

      return errors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Validate all fields before submission
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
         toast.error("Validation Error", {
            description: `Please fill in all required fields: ${validationErrors.join(", ")}`,
         });
         setIsSubmitting(false);
         return;
      }

      try {
         const response = await fetch("/api/registration", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
         }

         toast.success("Registration Successful!", {
            description:
               "Thank you for registering! Your registration has been submitted successfully.",
         });

         setFormData({
            organisationName: "",
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            gender: "",
            categorisation: "",
            registeredOnMarketplace: null,
            interests: "",
            permissionForFutureEvents: null,
         });

         // Refresh the page after 2 seconds
         setTimeout(() => {
            router.refresh();
         }, 2000);
      } catch (error) {
         toast.error("Registration Failed", {
            description: error.message,
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   // Categories array
   const categories = ["Customer", "Business", "Solar company", "Financiers", "Development Agency"];

   // Gender options
   const genderOptions = ["Male", "Female", "Prefer not to say"];

   return (
      <Card className=" border shadow-none md:w-[800px]! ">
         <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
               Solar Fair Registration
            </CardTitle>
            <CardDescription className="text-center">
               Complete the form below to register for our upcoming Solar Fair event
            </CardDescription>
         </CardHeader>

         <CardContent>
            <form
               onSubmit={handleSubmit}
               className="space-y-6"
            >
               {/* Organization Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-medium">Organization Information</h3>
                  <Separator />

                  <div className="grid gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="organisationName">
                           Organization Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                           id="organisationName"
                           name="organisationName"
                           value={formData.organisationName}
                           onChange={(e) => handleChange("organisationName", e.target.value)}
                           placeholder="Enter your organization name"
                           required
                        />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="categorisation">
                           Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                           value={formData.categorisation}
                           onValueChange={(value) => handleChange("categorisation", value)}
                           required
                        >
                           <SelectTrigger id="categorisation">
                              <SelectValue placeholder="Select your category" />
                           </SelectTrigger>
                           <SelectContent>
                              {categories.map((category) => (
                                 <SelectItem
                                    key={category}
                                    value={category}
                                 >
                                    {category}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="grid gap-2">
                        <Label
                           htmlFor="registeredOnMarketplace"
                           className="mb-1"
                        >
                           Are you registered on the Solar Marketplace?{" "}
                           <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                           value={
                              formData.registeredOnMarketplace === null
                                 ? ""
                                 : formData.registeredOnMarketplace
                                 ? "Yes"
                                 : "No"
                           }
                           onValueChange={(value) => handleChange("registeredOnMarketplace", value)}
                           className="flex space-x-4"
                           required
                        >
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 value="Yes"
                                 id="marketplace-yes"
                              />
                              <Label htmlFor="marketplace-yes">Yes</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 value="No"
                                 id="marketplace-no"
                              />
                              <Label htmlFor="marketplace-no">No</Label>
                           </div>
                        </RadioGroup>
                     </div>
                  </div>
               </div>

               {/* Personal Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="firstName">
                           First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                           id="firstName"
                           name="firstName"
                           value={formData.firstName}
                           onChange={(e) => handleChange("firstName", e.target.value)}
                           required
                        />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="lastName">
                           Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                           id="lastName"
                           name="lastName"
                           value={formData.lastName}
                           onChange={(e) => handleChange("lastName", e.target.value)}
                           required
                        />
                     </div>
                  </div>

                  <div className="grid gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="email">
                           Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={(e) => handleChange("email", e.target.value)}
                           placeholder="you@example.com"
                           required
                        />
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="phone">
                           Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                           type="tel"
                           id="phone"
                           name="phone"
                           value={formData.phone}
                           onChange={(e) => handleChange("phone", e.target.value)}
                           placeholder="Enter your phone number"
                           required
                        />
                     </div>
                  </div>

                  <div className="grid gap-2">
                     <Label>
                        Gender <span className="text-red-500">*</span>
                     </Label>
                     <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                        required
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                     >
                        {genderOptions.map((option) => (
                           <div
                              key={option}
                              className="flex items-center space-x-2"
                           >
                              <RadioGroupItem
                                 value={option}
                                 id={`gender-${option}`}
                              />
                              <Label htmlFor={`gender-${option}`}>{option}</Label>
                           </div>
                        ))}
                     </RadioGroup>
                  </div>
               </div>

               {/* Additional Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <Separator />

                  <div className="grid gap-2">
                     <Label htmlFor="interests">
                        What would you be interested in from the Solar Fair?{" "}
                        <span className="text-red-500">*</span>
                     </Label>
                     <Textarea
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={(e) => handleChange("interests", e.target.value)}
                        placeholder="Please share your interests or what you hope to get from the event..."
                        className="min-h-[100px]"
                        required
                     />
                  </div>

                  <div className="grid gap-2">
                     <Label
                        htmlFor="permissionForFutureEvents"
                        className="mb-1"
                     >
                        Permission to use this information for Future Events{" "}
                        <span className="text-red-500">*</span>
                     </Label>
                     <RadioGroup
                        value={
                           formData.permissionForFutureEvents === null
                              ? ""
                              : formData.permissionForFutureEvents
                              ? "I accept"
                              : "I decline"
                        }
                        onValueChange={(value) => handleChange("permissionForFutureEvents", value)}
                        className="flex space-x-4"
                        required
                     >
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem
                              value="I accept"
                              id="permission-accept"
                           />
                           <Label htmlFor="permission-accept">I accept</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem
                              value="I decline"
                              id="permission-decline"
                           />
                           <Label htmlFor="permission-decline">I decline</Label>
                        </div>
                     </RadioGroup>
                  </div>
               </div>

               <CardFooter className="flex justify-center px-0 pt-4">
                  <Button
                     type="submit"
                     className="w-full sm:w-auto"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Submitting...
                        </>
                     ) : (
                        "Submit Registration"
                     )}
                  </Button>
               </CardFooter>
            </form>
         </CardContent>
      </Card>
   );
}
