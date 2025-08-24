// 'use client'

// import ReusableDialog from '@/components/reusable/dialog';
// import React, { useState } from 'react'

// const proceedToBook = () => {
//   const [showLoginDialog, setShowLoginDialog] = useState(false);

//   // Check if user is logged in
//     const user = await getUser();
//     if (!user) {
//       setShowLoginDialog(true);
//       return;
//     }
//   return (
//     {/* ReusableDialog for login */}
//       <ReusableDialog
//         open={showLoginDialog}
//         onOpenChange={setShowLoginDialog}
//         closable={false}
//         contentClassName="bg-gray-900 border-1 border-gray-800"
//       >
//         <button onClick={() => setShowLoginDialog(false)} className="relative mx-auto justify-center p-10 flex flex-col cursor-pointer opacity-80 items-center bg-gray-800 hover:opacity-100 hover:border hover:border-gray-600 rounded-full">
//           <X className="font-bold text-red-600 opacity-100"/>
//         </button>
//         <p className="text-center text-xl font-bold">Login Required</p>
//         <p className="text-sm text-center text-gray-400">
//           Please log in to continue with your booking.
//         </p>
//         <button className="primary-btn py-5 mt-4" onClick={() => (window.location.href = '/auth/login')}>
//             Login
//           </button>
//       </ReusableDialog>
//   )
// }

// export default proceedToBook