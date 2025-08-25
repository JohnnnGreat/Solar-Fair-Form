"use client";

import { useState } from "react";
import { Loader2, Building2, User, FileText } from "lucide-react";

export default function RegistrationForm() {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
      organisationName: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      categorisation: "",
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
      if (!formData.organisationName.trim()) errors.push("Organization Name is required");
      if (!formData.categorisation) errors.push("Category is required");

      if (!formData.firstName.trim()) errors.push("First Name is required");
      if (!formData.lastName.trim()) errors.push("Last Name is required");
      if (!formData.email.trim()) errors.push("Email is required");
      if (!formData.phone.trim()) errors.push("Phone is required");
      if (!formData.gender) errors.push("Gender is required");
      if (!formData.age) errors.push("Age is required");
      if (!formData.interests.trim()) errors.push("Interests field is required");
      if (formData.permissionForFutureEvents === null)
         errors.push("Permission for future events is required");
      return errors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
         alert(`Please fill in all required fields: ${validationErrors.join(", ")}`);
         setIsSubmitting(false);
         return;
      }

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));

         alert("Registration Successful! Thank you for registering!");

         setFormData({
            organisationName: "",
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            gender: "",
            age: "",
            categorisation: "",
            registeredOnMarketplace: null,
            interests: "",
            permissionForFutureEvents: null,
         });
      } catch (error) {
         alert("Registration Failed: " + error.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   const categories = ["Customer", "Business", "Solar company", "Financiers", "Development Agency"];
   const genderOptions = ["Male", "Female", "Prefer not to say"];
   const ageOptions = ["18 to 23", "24 to 35", "Above 35"];

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg mb-8 p-8 text-center">
               <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                  Virtual Power Plants Design Plan Workshop
               </h1>
               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Complete the registration form below to secure your spot at our upcoming Virtual
                  Power Plants Design Plan Workshop
               </p>
            </div>

            {/* Form */}
            <div className="space-y-8">
               {/* Organization Information Section */}
               <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="border-b border-gray-200 px-6 py-4">
                     <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                           Organization Information
                        </h2>
                     </div>
                  </div>

                  <div className="p-6 space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label
                              htmlFor="organisationName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              Organization Name <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="organisationName"
                              name="organisationName"
                              type="text"
                              value={formData.organisationName}
                              onChange={(e) => handleChange("organisationName", e.target.value)}
                              placeholder="Enter your organization name"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="categorisation"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              Category <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="categorisation"
                              value={formData.categorisation}
                              onChange={(e) => handleChange("categorisation", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           >
                              <option value="">Select your category</option>
                              {categories.map((category) => (
                                 <option
                                    key={category}
                                    value={category}
                                 >
                                    {category}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Personal Information Section */}
               <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="border-b border-gray-200 px-6 py-4">
                     <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                           Personal Information
                        </h2>
                     </div>
                  </div>

                  <div className="p-6 space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              First Name <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => handleChange("firstName", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              Last Name <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => handleChange("lastName", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           />
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              Email Address <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           />
                        </div>

                        <div>
                           <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-2"
                           >
                              Phone Number <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              required
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                           Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           {genderOptions.map((option) => (
                              <label
                                 key={option}
                                 className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                 <input
                                    type="radio"
                                    name="gender"
                                    value={option}
                                    checked={formData.gender === option}
                                    onChange={(e) => handleChange("gender", e.target.value)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    required
                                 />
                                 <span className="ml-3 text-sm text-gray-700">{option}</span>
                              </label>
                           ))}
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                           Age Range <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           {ageOptions.map((option) => (
                              <label
                                 key={option}
                                 className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                 <input
                                    type="radio"
                                    name="age"
                                    value={option}
                                    checked={formData.age === option}
                                    onChange={(e) => handleChange("age", e.target.value)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    required
                                 />
                                 <span className="ml-3 text-sm text-gray-700">{option}</span>
                              </label>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Additional Information Section */}
               <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="border-b border-gray-200 px-6 py-4">
                     <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                           Additional Information
                        </h2>
                     </div>
                  </div>

                  <div className="p-6 space-y-6">
                     <div>
                        <label
                           htmlFor="interests"
                           className="block text-sm font-medium text-gray-700 mb-2"
                        >
                           What would you be interested in from the Solar Fair?{" "}
                           <span className="text-red-500">*</span>
                        </label>
                        <textarea
                           id="interests"
                           name="interests"
                           value={formData.interests}
                           onChange={(e) => handleChange("interests", e.target.value)}
                           placeholder="Please share your interests or what you hope to get from the event..."
                           rows={4}
                           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                           required
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                           Permission to use this information for Future Events{" "}
                           <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {["I accept", "I decline"].map((option) => (
                              <label
                                 key={option}
                                 className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                 <input
                                    type="radio"
                                    name="permissionForFutureEvents"
                                    value={option}
                                    checked={
                                       formData.permissionForFutureEvents === null
                                          ? false
                                          : formData.permissionForFutureEvents
                                          ? option === "I accept"
                                          : option === "I decline"
                                    }
                                    onChange={(e) =>
                                       handleChange("permissionForFutureEvents", e.target.value)
                                    }
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    required
                                 />
                                 <span className="ml-3 text-sm text-gray-700">{option}</span>
                              </label>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Submit Button */}
               <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center">
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                        {isSubmitting ? (
                           <div className="flex items-center justify-center">
                              <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
                              Submitting Registration...
                           </div>
                        ) : (
                           "Submit Registration"
                        )}
                     </button>

                     <p className="mt-3 text-sm text-gray-500">
                        All fields marked with <span className="text-red-500">*</span> are required
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
