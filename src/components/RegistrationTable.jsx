"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Download, Filter, MoreVertical, Search } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { RegistrationDetails } from "./RegistrationDetails";

export default function RegistrationsTable() {
   const [registrations, setRegistrations] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [filterCategory, setFilterCategory] = useState("");
   const [viewingRegistration, setViewingRegistration] = useState(null);
   const itemsPerPage = 10;

   useEffect(() => {
      const fetchRegistrations = async () => {
         try {
            const response = await fetch("/api/registration");
            const data = await response.json();
            if (!response.ok) {
               throw new Error(data.error || "Failed to fetch registrations");
            }
            setRegistrations(data.registrations);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };
      fetchRegistrations();
   }, []);

   const handleDelete = async (id) => {
      try {
         const response = await fetch("/api/registration", {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
         });

         if (!response.ok) {
            throw new Error("Failed to delete registration");
         }

         // Refresh the data after deletion
         const updatedRegistrations = registrations.filter((reg) => reg._id !== id);
         setRegistrations(updatedRegistrations);

         // Show success message
         alert("Registration deleted successfully");
      } catch (error) {
         setError(error.message);
      }
   };

   const handleExport = async () => {
      try {
         const response = await fetch("/api/registration/export");
         if (!response.ok) throw new Error("Export failed");

         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = url;
         a.download = "registrations.xlsx";
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
         document.body.removeChild(a);
      } catch (error) {
         setError(error.message);
      }
   };

   // Filter and search functionality
   const filteredRegistrations = registrations.filter((registration) => {
      // Filter by category if filter is set
      if (filterCategory && registration.categorisation !== filterCategory) {
         return false;
      }

      // Search functionality
      if (searchTerm) {
         const searchLower = searchTerm.toLowerCase();
         return (
            registration.organisationName?.toLowerCase().includes(searchLower) ||
            registration.firstName?.toLowerCase().includes(searchLower) ||
            registration.lastName?.toLowerCase().includes(searchLower) ||
            registration.email?.toLowerCase().includes(searchLower)
         );
      }

      return true;
   });

   // Pagination
   const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
   const currentData = filteredRegistrations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
   );

   // Get unique categories for filter
   const categories = [...new Set(registrations.map((r) => r.categorisation))].filter(Boolean);

   // Loading state
   if (loading) {
      return (
         <Card className="w-full">
            <CardHeader>
               <CardTitle>Registrations</CardTitle>
               <CardDescription>Loading registration data...</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-2">
                  {Array(5)
                     .fill(0)
                     .map((_, i) => (
                        <Skeleton
                           key={i}
                           className="w-full h-12"
                        />
                     ))}
               </div>
            </CardContent>
         </Card>
      );
   }

   // Error state
   if (error) {
      return (
         <Alert
            variant="destructive"
            className="my-8"
         >
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
         </Alert>
      );
   }

   // Empty state
   if (registrations.length === 0) {
      return (
         <Card className="w-full">
            <CardHeader>
               <CardTitle>Registrations</CardTitle>
               <CardDescription>No registrations found.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8 text-muted-foreground">
               No registration data is available at this time.
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className="w-full">
         <CardHeader>
            <div className="flex justify-between items-center">
               <div>
                  <CardTitle>Registrations</CardTitle>
                  <CardDescription>Manage and view all Solar Fair registrations</CardDescription>
               </div>
               <Button
                  onClick={handleExport}
                  variant="outline"
                  className="gap-2"
               >
                  <Download className="h-4 w-4" /> Export Data
               </Button>
            </div>
         </CardHeader>
         <CardContent>
            <div className="flex items-center justify-between mb-4">
               <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search registrations..."
                     value={searchTerm}
                     onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                     }}
                     className="pl-8"
                  />
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                     >
                        <Filter className="h-4 w-4" /> Filter
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={() => {
                           setFilterCategory("");
                           setCurrentPage(1);
                        }}
                        className={filterCategory === "" ? "bg-accent" : ""}
                     >
                        All Categories
                     </DropdownMenuItem>
                     {categories.map((category) => (
                        <DropdownMenuItem
                           key={category}
                           onClick={() => {
                              setFilterCategory(category);
                              setCurrentPage(1);
                           }}
                           className={filterCategory === category ? "bg-accent" : ""}
                        >
                           {category}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <div className="rounded-md border">
               <Table>
                  <TableCaption>
                     {filterCategory
                        ? `Showing ${currentData.length} of ${filteredRegistrations.length} ${filterCategory} registrations`
                        : searchTerm
                        ? `Showing ${filteredRegistrations.length} of ${registrations.length} registrations`
                        : `Total ${registrations.length} registrations`}
                  </TableCaption>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Organisation</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Marketplace</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {currentData.length > 0 ? (
                        currentData.map((registration) => (
                           <TableRow key={registration._id}>
                              <TableCell className="font-medium">
                                 {registration.organisationName}
                              </TableCell>
                              <TableCell>{`${registration.firstName} ${registration.lastName}`}</TableCell>
                              <TableCell>{registration.email}</TableCell>
                              <TableCell>
                                 <Badge variant="outline">{registration.categorisation}</Badge>
                              </TableCell>
                              <TableCell>
                                 {registration.registeredOnMarketplace ? (
                                    <Badge
                                       variant="success"
                                       className="bg-green-100 text-green-800"
                                    >
                                       Yes
                                    </Badge>
                                 ) : (
                                    <Badge variant="secondary">No</Badge>
                                 )}
                              </TableCell>
                              <TableCell>
                                 {new Date(registration.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                       >
                                          <MoreVertical className="h-4 w-4" />
                                          <span className="sr-only">Open menu</span>
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                       <DropdownMenuItem
                                          onClick={() => setViewingRegistration(registration)}
                                       >
                                          View Details
                                       </DropdownMenuItem>
                                       <DropdownMenuItem>Send Email</DropdownMenuItem>
                                       <DropdownMenuSeparator />
                                       <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={() => {
                                             if (
                                                confirm(
                                                   "Are you sure you want to delete this registration?",
                                                )
                                             ) {
                                                handleDelete(registration._id);
                                             }
                                          }}
                                       >
                                          Remove
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </TableCell>
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell
                              colSpan={7}
                              className="text-center h-24"
                           >
                              No matching registrations found
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </div>
         </CardContent>
         <CardFooter>
            {totalPages > 1 && (
               <Pagination className="w-full flex justify-center">
                  <PaginationContent>
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                           className={
                              currentPage === 1
                                 ? "pointer-events-none opacity-50"
                                 : "cursor-pointer"
                           }
                        />
                     </PaginationItem>

                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logic for showing pagination numbers
                        let pageNum;
                        if (totalPages <= 5) {
                           pageNum = i + 1;
                        } else {
                           if (currentPage <= 3) {
                              pageNum = i + 1;
                           } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                           } else {
                              pageNum = currentPage - 2 + i;
                           }
                        }

                        return (
                           <PaginationItem key={i}>
                              <PaginationLink
                                 onClick={() => setCurrentPage(pageNum)}
                                 isActive={currentPage === pageNum}
                              >
                                 {pageNum}
                              </PaginationLink>
                           </PaginationItem>
                        );
                     })}

                     {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                           <PaginationItem>
                              <PaginationEllipsis />
                           </PaginationItem>
                           <PaginationItem>
                              <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                                 {totalPages}
                              </PaginationLink>
                           </PaginationItem>
                        </>
                     )}

                     <PaginationItem>
                        <PaginationNext
                           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                           className={
                              currentPage === totalPages
                                 ? "pointer-events-none opacity-50"
                                 : "cursor-pointer"
                           }
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            )}
         </CardFooter>
         {viewingRegistration && (
            <RegistrationDetails
               registration={viewingRegistration}
               open={!!viewingRegistration}
               onOpenChange={(open) => !open && setViewingRegistration(null)}
            />
         )}
      </Card>
   );
}
