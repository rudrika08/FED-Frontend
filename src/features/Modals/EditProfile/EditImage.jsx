import React, { useContext, useState } from 'react';
import AvatarEditor from "react-avatar-editor";
import { FaUpload } from "react-icons/fa";
import style from "./styles/editImage.module.scss";
import { useRef } from 'react';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import { Button } from '../../../components';
import { X } from 'lucide-react';

const EditImage = ({ selectedFile, closeModal, setimage }) => {
  const [scale, setScale] = useState(1);
  const authCtx = useContext(AuthContext);
  const editorRef = useRef(null);
  console.log(style)

  const handleScaleChange = (e) => {
    const scaleValue = parseFloat(e.target.value);
    setScale(scaleValue);
  };

  const handleSave = async () => {
    if (editorRef.current && selectedFile) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const imageFile = new File([blob], "profile.jpg", { type: "image/jpeg" });
        console.log(imageFile);
        // const formData = new FormData();
        // formData.append('email', authCtx.user.email);
        // formData.append('image', imageFile);
        // console.log(formData);

        try {
         
          const dataToSend = {
            email: authCtx.user.email,
            image: imageFile
          };
    
          console.log("FormData:", dataToSend); 
  
          // console.log(formData);

          // const response = await axios.post('/api/updateProfileImage', formData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // });

          // console.log("Response:", response.data);
         
      
        } catch (error) {
          console.error("Error:", error);
          // Handle error (show message, retry logic, etc.)
        }
        setimage(URL.createObjectURL(blob));
        closeModal();
      }, "image/jpeg"); 
    }
  };

  return (
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: "10",
      left: "0",
      top: "0",
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: "100%",
        height: "100%",
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: "blur(4px)",
        zIndex: '5',
      }}>
        <div style={{
          zIndex: '10',
          borderRadius: '10px',
          padding: "2rem",
          position: "relative",
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          marginTop: ".3rem",
        }}>
          <div className={style.container}>
          <button
                    className={style.closeModal} 
                    onClick={()=>closeModal()}
                  >
                    <X />
                  </button>
            <AvatarEditor
              ref={editorRef}
              image={selectedFile}
              width={150}
              height={150}
              border={50}
              style={{ borderRadius: "2rem" }}
              borderRadius={125}
              scale={scale}
            />
            <div className={style.wrapper}>     <input
            className={style.rangeInput}
              type="range"
              value={scale}
              min="1"
              max="2"
              step="0.01"
              onChange={handleScaleChange}
            /></div>
       
            <div style={{display:"flex",justifyContent:"center"}}>
           <Button type='button' onClick={handleSave} className={style.submit}>  <FaUpload /> Update Image</Button>
                        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImage;
