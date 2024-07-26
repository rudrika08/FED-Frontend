import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./styles/AddMemberForm.module.scss";
import { Button, Input } from "../../../../../components";
import AccessTypes from "../../../../../data/Access.json";
import AuthContext from "../../../../../context/AuthContext";

function AddMemberForm() {
   const authCtx = useContext(AuthContext);
   const [data, setData] = useState({
     name: "",
     email: "",
     access: "",
     img: "",
     linkedin: "",
     github: "",
     title: "",
     know: ""
   });

   useEffect(() => {
     if (authCtx.memberData) {

       setData({
         name: authCtx.memberData.name || "",
         email: authCtx.memberData.email || "",
         access: authCtx.memberData.access || "",
         img: authCtx.memberData.img || "",
         linkedin: authCtx.memberData?.extra?.linkedin || "",
         github: authCtx.memberData?.extra?.github || "",
         title: authCtx.memberData?.extra?.title || "",
         know: authCtx.memberData?.extra?.know || ""
       });
     }
   }, [authCtx.memberData]);

   const [accessTypes, setAccessTypes] = useState([]);

   useEffect(() => {
     fetchAccessTypes();
   }, []);

   const fetchAccessTypes = async () => {
     try {
       // const response = await axios.get("/api/access/types"); // Uncomment and use actual API
       // const fetchedAccessTypes = response.data.data;
       // setAccessTypes(fetchedAccessTypes);
       setAccessTypes(AccessTypes.data);
     } catch (error) {
       console.error("Error fetching access types:", error);
       setAccessTypes([]);
     }
   };

   const isFormFilled = () => {
     const { name, email, access, img, linkedin, github, title, know } = data;
     return (
       name.trim() !== "" &&
       email.trim() !== "" &&
       access.trim() !== "" &&
       img.trim() !== "" &&
       linkedin.trim() !== "" &&
       github.trim() !== "" &&
       title.trim() !== "" &&
       know.trim() !== ""
     );
   };

   const onAddOrUpdateMember= async () => {
     if (isFormFilled()) {
       try {
         console.log("Member Data", data);
         // const response = await axios.post("/api/members/add", data);
         // console.log("Member added successfully:", response.data);
         setData({
           name: "",
           email: "",
           access: "",
           img: "",
           linkedin: "",
           github: "",
           title: "",
           know: ""
         });
         alert("Member Added Successfully");
       } catch (error) {
         console.error("Error adding member:", error);
         alert("Failed to add member. Please try again.");
       }
     } else {
       alert("Please fill all the fields");
     }
   };

   return (
     <div className={styles.main}>
       <div className={styles.formHead}>
         <Input
           placeholder="Name"
           type="text"
           label="Enter Member Name"
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
           value={data.name}
           onChange={(e) => setData({ ...data, name: e.target.value })}
         />
         <Input
           placeholder="Enter Member Email"
           type="text"
           label="Email"
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
           value={data.email}
           onChange={(e) => setData({ ...data, email: e.target.value })}
         />
       </div>
       <div className={styles.formHead}>
         <Input
           placeholder="Select Access"
           type="select"
           label="Access"
           options={accessTypes.map((type) => ({ value: type, label: type }))}
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
           value={data.access}
           onChange={(value) => setData({ ...data, access: value })}
         />
         <Input
           placeholder="Enter Member Image Link"
           type="text"
           label="Image"
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
           value={data.img}
           onChange={(e) => setData({ ...data, img: e.target.value })}
         />
       </div>
       <div className={styles.formHead}>
         <Input
           placeholder="Enter Member LinkedIn Link"
           type="text"
           label="LinkedIn"
           className={styles.memberInput}
           value={data.linkedin}
           onChange={(e) => setData({ ...data, linkedin: e.target.value })}
           containerStyle={{ width: "100%" }}
         />
         <Input
           placeholder="Enter Member Github Link"
           type="text"
           label="Github"
           value={data.github}
           onChange={(e) => setData({ ...data, github: e.target.value })}
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
         />
       </div>
       <div className={styles.formHead}>
         <Input
           placeholder="Enter Title"
           type="text"
           label="Title"
           value={data.title}
           onChange={(e) => setData({ ...data, title: e.target.value })}
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
         />
         <Input
           placeholder="Enter Know"
           type="text"
           label="Know"
           value={data.know}
           onChange={(e) => setData({ ...data, know: e.target.value })}
           className={styles.memberInput}
           containerStyle={{ width: "100%" }}
         />
       </div>
       <div className={styles.formHead}>
       <Button onClick={onAddOrUpdateMember}>
          {authCtx.memberData ? "Update Member" : "Add Member"}
        </Button>
       </div>
     </div>
   );
}

export default AddMemberForm;
