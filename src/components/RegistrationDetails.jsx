"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function RegistrationDetails(props) {
   const { registration, open, onOpenChange } = props;
   if (!registration) return null;

   return (
      <Dialog
         open={open}
         onOpenChange={onOpenChange}
         className="overflow-y-hidden"
      >
         <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Registration Details</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-sm text-muted-foreground">First Name</p>
                        <p>{registration.firstName}</p>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Last Name</p>
                        <p>{registration.lastName}</p>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{registration.email}</p>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{registration.phone || "Not provided"}</p>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p>{registration.gender || "Not specified"}</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <h3 className="text-lg font-medium">Organization Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Organization Name</p>
                        <p>{registration.organisationName}</p>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <Badge variant="outline">{registration.categorisation}</Badge>
                     </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Marketplace Registration</p>
                        {registration.registeredOnMarketplace ? (
                           <Badge
                              variant="success"
                              className="bg-green-100 text-green-800"
                           >
                              Registered
                           </Badge>
                        ) : (
                           <Badge variant="secondary">Not Registered</Badge>
                        )}
                     </div>
                  </div>
               </div>

               {registration.interests && (
                  <div className="space-y-2">
                     <h3 className="text-lg font-medium">Interests</h3>
                     <p>{registration.interests}</p>
                  </div>
               )}

               <div className="space-y-2">
                  <h3 className="text-lg font-medium">Permissions</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-sm text-muted-foreground">Future Events Permission</p>
                        {registration.permissionForFutureEvents ? (
                           <Badge
                              variant="success"
                              className="bg-green-100 text-green-800"
                           >
                              Granted
                           </Badge>
                        ) : (
                           <Badge variant="secondary">Not Granted</Badge>
                        )}
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <h3 className="text-lg font-medium">Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-sm text-muted-foreground">Registration Date</p>
                        <p>{format(new Date(registration.createdAt), "PPpp")}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
               <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
               >
                  Close
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
