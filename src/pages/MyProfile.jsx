// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios"; // Assuming you're using Axios
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";

// export default function MyProfile() {
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [userUpdatedData, setUserUpdatedData] = useState({});
//   const { ptoken,userData,fetchUser,userId,    backendUrl,setUserObj, setToken } = useContext(AppContext);

//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [files, setFiles] = useState([]);
//  console.log(userData)

// useEffect(()=>{
//   fetchUser()
// },[])

//   // handele report deete
//   const handleDeleteFile = async (index, fileId) => {
//     try {
//       // Send delete request to the backend
//       console.log("fileId is...",fileId)
//       const response = await axios.delete(`${backendUrl}/api/user/information/delete/${userID}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         params:{
//           param1:`${fileId}`
//         }
//       }
//     );

//       if (response.status === 200) {
//         // Remove the file from the state after deletion
//         const updatedFiles = files.filter((_, i) => i !== index);
//         setFiles(updatedFiles); // Assuming `setFiles` is the function that updates the state
//       }
//     } catch (error) {
//       console.error("Error deleting the file", error);
//     }
//   };
//   // file handling
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setUploadedFiles((prev) => [...prev, ...files]);
//   };
//   const removeFile = (index) => {
//     setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
//   };
//   const saveProfile = async () => {
//     try {
//       setLoading(true);
//       setMessage("");
//       const formData = new FormData();
//       // Append non-file fields
//       formData.append("name", userData.name);
//       formData.append("email", userData.email);
//       formData.append("phone", userUpdatedData.phone);
//       formData.append("gender", userUpdatedData.gender || "Male");
//       formData.append("birthDate", userUpdatedData.dob);
//       formData.append("address[line1]", userUpdatedData?.address?.line1);
//       formData.append("address[line2]", userUpdatedData?.address?.line2);
//       uploadedFiles.forEach((file) => {
//         formData.append("uploadedFiles", file);
//       });

//       /// consoling form data
//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }
//       console.log(userId)
//       const {data} = await axios.put(
//         `${backendUrl}/api/patient/update-user/${userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${ptoken}`,
//             "Content-Type": "multipart/form-data", // Required for FormData
//           },
//         }
//       );
//       console.log("hiii",data)
//       if(data.success){
//         fetchUser()
//         console.log(userData)
//         toast.success(data.message)
//       }

//       setLoading(false);
//       setUploadedFiles([]);
//       setMessage("Profile updated successfully!");
//       setIsEdit(false);
//       // Optionally refetch updated data

//       setFiles(data.data.uploadedFiles);
//       // setUserData({
//       //   name: info.name,
//       //   email: info.email,
//       //   image: assets.profile_pic,
//       //   phone: data.data.phone || "2948293",
//       //   address: {
//       //     line1: data.data.address.line1,
//       //     line2: data.data.address.line2,
//       //   },
//       //   gender: data.data.gender,
//       //   dob: data.data.dob.split("T")[0],
//       //   uploadedFiles: [],
//       // });
//       // setUserObj(userData)
//     } catch (error) {
//       setLoading(false);
//       setMessage("Failed to update profile. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       key={userData?.name + userData?.email}
//       className="max-w-lg flex flex-col gap-2 text-sm"
//     >
//       <img className="w-36 rounded" src={userData?.image} alt="Profile" />
//       <p className="font-medium text-3xl text-neutral-800 mt-4">
//         {userData?.name || "Loading..."}
//       </p>
//       <hr className="bg-zinc-400 h-[1px] border-none" />
//       <p className="text-neutral-500 underline mt-3">Contact Information</p>
//       <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//         <p className="font-medium">Email Id:</p>
//         <p className="text-blue-500">{userData?.email || "Loading..."}</p>
//         <p className="font-medium">Phone:</p>
//         {isEdit ? (
//           <input
//             className="bg-gray-100 max-w-52"
//             type="text"
//             value={userUpdatedData.phone}
//             onChange={(e) =>
//               setUserUpdatedData((prev) => ({ ...prev, phone: e.target.value }))
//             }
//           />
//         ) : (
//           <p className="text-blue-500">{userData?.phone}</p>
//         )}
//         <p className="font-medium">Address:</p>
//         {isEdit ? (
//           <div>
//             <input
//               className="bg-gray-50"
//               value={userUpdatedData.address?.line1}
//               onChange={(e) =>
//                 setUserUpdatedData((prev) => ({
//                   ...prev,
//                   address: { ...prev.address, line1: e.target.value },
//                 }))
//               }
//               type="text"
//             />
//             <br />
//             <input
//               className="bg-gray-50"
//               value={userUpdatedData.address?.line2}
//               onChange={(e) =>
//                 setUserUpdatedData((prev) => ({
//                   ...prev,
//                   address: { ...prev.address, line2: e.target.value },
//                 }))
//               }
//               type="text"
//             />
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             {userData?.address?.line1 ?? "5th cross street"}
//             <br />
//             {userData?.address?.line2?? "NY"}
//           </p>
//         )}
//       </div>

//       <div>
//         <p className="text-neutral-500 underline mt-3">Basic Information</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//           <p className="font-medium">Gender:</p>
//           {isEdit ? (
//             <select
//               className="max-w-20 bg-gray-100"
//               value={userUpdatedData?.gender}
//               onChange={(e) =>
//                 setUserUpdatedData((prev) => ({ ...prev, gender: e.target.value }))
//               }
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           ) : (
//             <p className="text-gray-400">{userData?.gender??"Male"}</p>
//           )}
//           <p className="font-medium">Birth Date</p>
//           {isEdit ? (
//             <input
//               className="max-w-28 bg-gray-100"
//               type="date"
//               value={userUpdatedData?.birthDate}
//               onChange={(e) =>
//                 setUserUpdatedData((prev) => ({ ...prev, dob: e.target.value }))
//               }
//             />
//           ) : (
//             <p className="text-gray-400">{userData?.birthDate??"01/01/2000"}</p>
//           )}
//         </div>
//       </div>

//       {/* save and edit */}
//       <div className="mt-10">
//         {loading ? (
//           <p>Saving...</p>
//         ) : isEdit ? (
//           <button
//             className="hover:text-white hover:bg-primary transition-all border-primary px-8 py-2 rounded-full"
//             onClick={saveProfile}
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className="hover:text-white hover:bg-primary transition-all border-primary px-8 py-2 rounded-full"
//             onClick={() => setIsEdit(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//       {message && <p className="text-center mt-4">{message}</p>}
//       {/* upload report start */}
//       <div className="mt-4">
//         <p>Upload Reports (PDF, Images, Videos)</p>
//           <>
//           <input
//         type="text"
//         placeholder="Enter Custom Name"
//         value={customName}
//         onChange={handleNameChange}
//         className="block w-full border p-2 rounded-md"
//       />
//             <input
//               type="file"
//               accept=".pdf, image/*, video/*"
//               multiple
//               name="uploadedFiles"
//               onChange={handleFileChange}
//               className="block w-full border p-2 rounded-md"
//             />
//             <div className="mt-2">
//               {uploadedFiles.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
//                 >
//                   <p className="text-sm text-gray-700">{file.name}</p>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="text-red-500 text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>

//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using Axios
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userUpdatedData, setUserUpdatedData] = useState({});
  const {
    ptoken,
    userData,
    fetchUser,
    userId,
    backendUrl,
    setUserObj,
    setToken,
  } = useContext(AppContext);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [customName, setCustomName] = useState(""); // For custom file naming

  console.log(userData);

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle report delete
  const handleDeleteFile = async (index, fileId) => {
    try {
      // Send delete request to the backend
      console.log("fileId is...", fileId);
      const response = await axios.delete(
        `${backendUrl}/api/user/information/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${ptoken}`,
          },
          params: {
            param1: `${fileId}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove the file from the state after deletion
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles); // Assuming `setFiles` is the function that updates the state
      }
    } catch (error) {
      console.error("Error deleting the file", error);
    }
  };

  // File handling
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle custom name change
  const handleNameChange = (e) => {
    setCustomName(e.target.value);
  };

  // Save profile
  const saveProfile = async () => {
    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      // Append non-file fields
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userUpdatedData.phone);
      formData.append("gender", userUpdatedData.gender || "Male");
      formData.append("birthDate", userUpdatedData.dob);
      formData.append("address[line1]", userUpdatedData?.address?.line1);
      formData.append("address[line2]", userUpdatedData?.address?.line2);
      uploadedFiles.forEach((file) => {
        formData.append("uploadedFiles", file);
      });

      // Logging form data
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log(userId);

      const { data } = await axios.put(
        `${backendUrl}/api/patient/update-user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${ptoken}`,
            "Content-Type": "multipart/form-data", // Required for FormData
          },
        }
      );

      console.log("hiii", data);
      if (data.success) {
        fetchUser();
        console.log(userData);
        toast.success(data.message);
      }

      setLoading(false);
      setUploadedFiles([]);
      setMessage("Profile updated successfully!");
      setIsEdit(false);
      setFiles(data.data.uploadedFiles);
    } catch (error) {
      setLoading(false);
      setMessage("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  // Upload reports to a different route
  const uploadReports = async () => {
    try {
      setLoading(true);
      setMessage("");
  
      const formData = new FormData();
  
      // Append customName
      formData.append("customName", customName);
  
      // Append fileType (you can derive this from the file or let the user specify it)
      const fileType = uploadedFiles[0]?.type || "application/octet-stream"; // Default to a generic type if not available
      formData.append("fileType", fileType);
  
      // Append each file
      uploadedFiles.forEach((file, index) => {
        formData.append("file", file); // Use "file" as the key if the backend expects it
      });
  
      // Iterate over FormData and log key-value pairs for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Send the FormData to the backend
      const { data } = await axios.put(
        `${backendUrl}/api/patient/upload-report/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${ptoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        setUploadedFiles([]); // Clear uploaded files
        setCustomName(""); // Reset custom name
      }
    } catch (error) {
      setMessage("Failed to upload reports. Please try again.");
      console.error("Error uploading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={userData?.name + userData?.email}
      className="max-w-lg flex flex-col gap-2 text-sm"
    >
      <img className="w-36 rounded" src={userData?.image} alt="Profile" />
      <p className="font-medium text-3xl text-neutral-800 mt-4">
        {userData?.name || "Loading..."}
      </p>
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <p className="text-neutral-500 underline mt-3">Contact Information</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Email Id:</p>
        <p className="text-blue-500">{userData?.email || "Loading..."}</p>
        <p className="font-medium">Phone:</p>
        {isEdit ? (
          <input
            className="bg-gray-100 max-w-52"
            type="text"
            value={userUpdatedData.phone}
            onChange={(e) =>
              setUserUpdatedData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p className="text-blue-500">{userData?.phone}</p>
        )}
        <p className="font-medium">Address:</p>
        {isEdit ? (
          <div>
            <input
              className="bg-gray-50"
              value={userUpdatedData.address?.line1}
              onChange={(e) =>
                setUserUpdatedData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              type="text"
            />
            <br />
            <input
              className="bg-gray-50"
              value={userUpdatedData.address?.line2}
              onChange={(e) =>
                setUserUpdatedData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              type="text"
            />
          </div>
        ) : (
          <p className="text-gray-500">
            {userData?.address?.line1 ?? "5th cross street"}
            <br />
            {userData?.address?.line2 ?? "NY"}
          </p>
        )}
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userUpdatedData?.gender}
              onChange={(e) =>
                setUserUpdatedData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData?.gender ?? "Male"}</p>
          )}
          <p className="font-medium">Birth Date</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userUpdatedData?.birthDate}
              onChange={(e) =>
                setUserUpdatedData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">
              {userData?.birthDate ?? "01/01/2000"}
            </p>
          )}
        </div>
      </div>

      {/* Save and edit */}
      <div className="mt-10">
        {loading ? (
          <p>Saving...</p>
        ) : isEdit ? (
          <button
            className="hover:text-white hover:bg-primary transition-all border-primary px-8 py-2 rounded-full"
            onClick={saveProfile}
          >
            Save Information
          </button>
        ) : (
          <button
            className="hover:text-white hover:bg-primary transition-all border-primary px-8 py-2 rounded-full"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
      {/* Display available reports */}
      <div className="mt-4">
  <p className="text-neutral-500 underline">Uploaded Reports</p>
  {userData?.uploadedFiles?.length > 0 ? (
    userData.uploadedFiles.map((report, index) => (
      <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2">
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">{report.customName || "Unnamed Report"}</p>
          <p className="text-xs text-gray-500">{report.fileType}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`${report.filePath}`} // Link to download the file
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-xs hover:underline"
          >
            View
          </a>
          <button
            onClick={() => handleDeleteFile(index, report.fileId)} // Handle file deletion
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No reports uploaded yet.</p>
  )}
</div>
      {message && <p className="text-center mt-4">{message}</p>}

      {/* Upload report section */}
      <div className="mt-4">
        <p>Upload Reports (PDF, Images, Videos)</p>
        <>
          <input
            type="text"
            placeholder="Enter Custom Name"
            value={customName}
            onChange={handleNameChange}
            className=" border p-2 rounded-md"
          />
          <input
            type="file"
            accept=".pdf, image/*, video/*"
            multiple
            name="uploadedFiles"
            onChange={handleFileChange}
            className=" border p-2 rounded-md"
          />
          <div className="mt-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
              >
                <p className="text-sm text-gray-700">{file.name}</p>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={uploadReports}
            disabled={loading || uploadedFiles.length === 0}
          >
            {loading ? "Uploading..." : "Upload Reports"}
          </button>
        </>
      </div>
    </div>
  );
}
