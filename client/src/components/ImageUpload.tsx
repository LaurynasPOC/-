import React, { useRef, useState } from "react";
import styled from "styled-components";

interface ImageUploadProps {
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previews: string[];
  removeImage: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  onChange,
  previews,
  removeImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setFileCount(
      previews.length + (e.target.files ? e.target.files.length : 0)
    );
  };

  const handleRemoveImage = (index: number) => {
    removeImage(index);
    setFileCount(previews.length - 1); // ✅ Update count dynamically
  };

  return (
    <StyledImageUpload>
      <HiddenFileInput
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <CustomFileInput onClick={() => fileInputRef.current?.click()}>
        {label || "Pasirinkti failus"}
      </CustomFileInput>
      {fileCount > 0 && <FileCount>{fileCount} failai (-ų)</FileCount>}

      {previews.length > 0 && (
        <PreviewContainer>
          {previews.map((src, index) => (
            <ImagePreview key={index}>
              <img src={src} alt={`Preview ${index}`} />
              <RemoveButton onClick={() => handleRemoveImage(index)}>
                ✖
              </RemoveButton>
            </ImagePreview>
          ))}
        </PreviewContainer>
      )}
    </StyledImageUpload>
  );
};

export default ImageUpload;

// 🎨 Styled Components
const StyledImageUpload = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomFileInput = styled.button`
  padding: 12px;
  background: var(--white);
  color: var(--black);
  border: 1px solid var(--primary);
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  transition: 0.3s ease-in-out;
`;

const FileCount = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: var(--secondary);
  text-align: center;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  text-align: left;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
