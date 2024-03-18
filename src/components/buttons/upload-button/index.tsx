// UploadButton.tsx
import { FC } from "react";
import "./style.css";

interface UploadButtonProps {
  upload: string;
  onFileSelect: (files: FileList | null) => void; 
}

const UploadButton: FC<UploadButtonProps> = ({ upload, onFileSelect }) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; 
    onFileSelect(selectedFiles); 
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} /> 
      <button className="upload-btn" >{upload}</button>
    </div>
  );
};

export default UploadButton;
