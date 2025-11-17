// import React from "react";

// const RoleInfoHeader = ({
//   role,
//   topicsToFocus,
//   experience,
//   questions,
//   description,
//   lastUpdated,
// }) => {
//   return (
//     <div className="bg-white relative">
//       <div className="container mx-auto px-10 md:px-0">
//         <div className="h-[200px] flex flex-col justify-center relative z-10">
//           <div className="flex items-start">
//             <div className="flex grow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-4xl text-bold font-medium">{role}</h2>
//                   <p className="text-xl text-semibold text-black mt-1">
//                     {topicsToFocus}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 mt-4">
//             <div className="text-[14px] font-semibold text-white bg-black px-3 py-1 rounded-full">
//               Experience: {experience} {experience == 1 ? "Year" : "Years"}
//             </div>

//             <div className="text-[14px] font-semibold text-white bg-black px-3 py-1 rounded-full">
//               {questions} Q & A
//             </div>

//             <div className="text-[14px] font-semibold text-white bg-black px-3 py-1 rounded-full">
//               Last Updated: {lastUpdated}
//             </div>
//           </div>
//         </div>

//         <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
//           <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
//           <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
//           <div className="w-16 h-16 bg-cyan-400 blur-[45px] animate-blob3" />
//           <div className="w-16 h-16 bg-fuchsia-400 blur-[45px] animate-blob1" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleInfoHeader;

import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Reddish gradient blobs (matching landing page) */}
        <div className="w-40 h-40 bg-red-300/40 blur-[90px] absolute -top-10 -left-10" />
        <div className="w-32 h-32 bg-rose-300/40 blur-[80px] absolute top-10 right-10" />
        <div className="w-24 h-24 bg-pink-400/30 blur-[70px] absolute bottom-0 left-1/2" />
      </div>

      <div className="container mx-auto px-6 md:px-0 relative z-10 py-10">
        <h2 className="text-4xl font-semibold text-gray-900">{role}</h2>
        <p className="text-lg text-gray-700 mt-2">{topicsToFocus}</p>

        {/* Badges */}
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          <span className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-semibold">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-semibold">
            {questions} Q&A
          </span>
          <span className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-semibold">
            Last Updated: {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
