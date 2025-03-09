import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import { Container } from "../../components/wrappers";
import Select from "../../components/Select";
import ImageUpload from "../../components/ImageUpload";
import { addProduct, ProductData } from "../../services/products";

const GoodsForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [isForSale, setIsForSale] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (selectedFiles.length === 0) {
        alert("Please select valid image files.");
        return;
      }

      setImages((prev) => [...prev, ...selectedFiles]);
      setPreviews((prev) => [
        ...prev,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token") ?? "";

    const newProduct: ProductData = {
      title,
      description,
      price,
      category,
      condition,
      isForSale: isForSale === "sale",
      location,
      contactInfo,
      images,
    };

    const response = await addProduct(token, newProduct);

    if (response.success) {
      console.log("Product added:", response.product);
    } else {
      console.error("Error:", response.message);
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <h4>Parduodu/Atiduodu</h4>
        <Input
          label="Pavadinimas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />
        <Input
          label="Aprašymas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          required
          multiline
        />
        <Select
          value={isForSale}
          onChange={(e) => setIsForSale(e.target.value)}
          label="Parduodu/atiduodu"
          options={[
            { value: "", label: "Pasirinkite ar parduodate ar atiduodate" },
            { value: "sale", label: "Parduodu" },
            { value: "give away", label: "Atiduodu" },
          ]}
        />
        {isForSale === "sale" && (
          <Input
            label="Kaina"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            required
          />
        )}

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Kategorija"
          options={[
            { value: "", label: "Pasrinkite produkto kategorija" },
            { value: "Elektronika", label: "Elektronika" },
            { value: "Baldai", label: "Baldai" },
            { value: "Apranga", label: "Apranga" },
            { value: "Knygos", label: "Knygos" },
          ]}
        />
        <Select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          label="Bukle"
          options={[
            { value: "", label: "Pasirinkite produkto bukle" },
            { value: "new", label: "Naujas" },
            { value: "like new", label: "Kaip naujas" },
            { value: "used", label: "Naudotas" },
          ]}
        />
        <ImageUpload
          onChange={handleImageUpload}
          previews={previews}
          removeImage={removeImage}
        />

        <InputWrapper>
          <label>Location (Optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <label>Contact Info (Email/Phone)</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </InputWrapper>

        <Button type="submit">Submit</Button>
      </FormWrapper>
    </Container>
  );
};

// Styled components
const FormWrapper = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

export default GoodsForm;
