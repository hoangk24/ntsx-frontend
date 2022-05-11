import UserProvider from "pages/admin/user/useUser";
import User from "pages/admin/user/User";
import React from "react";

export default function UserWrapper() {
 return (
  <UserProvider>
   <User />
  </UserProvider>
 );
}
