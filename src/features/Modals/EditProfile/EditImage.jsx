import React, { useContext, useState, useRef, useEffect } from 'react';
import AvatarEditor from "react-avatar-editor";
import { FaUpload } from "react-icons/fa";
import style from "./styles/editImage.module.scss";
import AuthContext from '../../../context/AuthContext';
import { Button } from '../../../components';
import { X } from 'lucide-react';
import { Alert, MicroLoading } from "../../../microInteraction";
import { api } from "../../../services";

const EditImage = ({ selectedFile, closeModal, setimage }) => {
  const [scale, setScale] = useState(1);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const editorRef = useRef(null);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);

  const handleScaleChange = (e) => {
    const scaleValue = parseFloat(e.target.value);
    setScale(scaleValue);
  };

  const handleSave = async () => {
    if (editorRef.current && selectedFile) {
      setIsLoading(true);
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const imageFile = new File([blob], "profile.jpg", { type: "image/jpeg" });

        try {
          const formData = new FormData();
          formData.append('email', authCtx.user.email);
          formData.append('image', imageFile);

          const response = await api.post('/api/updateProfileImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.status === 200 || response.status === 201) {
            console.log("Profile image updated successfully!", response.data);

            setimage(URL.createObjectURL(blob));
            setAlert({
              type: "success",
              message: "Profile image updated successfully.",
              position: "bottom-right",
              duration: 3000,
            });
            setTimeout(() => {
              closeModal();
              window.location.reload();
            }, 2000);
          } else {
            setAlert({
              type: "error",
              message: "There was an error updating your profile image. Please try again.",
              position: "bottom-right",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Error updating profile image:", error);
          setAlert({
            type: "error",
            message: "There was an error updating your profile image. Please try again.",
            position: "bottom-right",
            duration: 3000,
          });
        } finally {
          setIsLoading(false);
        }
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
              onClick={closeModal}
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
            <div className={style.wrapper}>
              <input
                className={style.rangeInput}
                type="range"
                value={scale}
                min="1"
                max="2"
                step="0.01"
                onChange={handleScaleChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type='button' onClick={handleSave} className={style.submit}>
                {isLoading ? (
                  <MicroLoading />
                ) : (
                  <>
                    <FaUpload /> Update Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default EditImage;
