import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { AddAPI } from "../../api/api";

interface PropsAddProducts {
  name: string;
  desc: string;
  price: number;
  stock: number;
}

interface Props {
  onHide: () => void;
}

const AddProduct: React.FC<Props> = ({ onHide }) => {
  const [submiting, setSubmiting] = useState(false);
  const [form, setForm] = useState<PropsAddProducts>({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
        desc: form.desc,
        price: form.price,
        stock: form.stock,
      };
      console.log(data);
      setSubmiting(true);
      const res = await AddAPI("/product/api/v1/products/add/", data);
      if (res) {
        alert("Product added succsufully");
        location.href = "/";
        setSubmiting(false);
        onHide();
      } else {
        alert("Fall add Proucts, Try, again!!");
      }
    } catch (error) {
      console.error(error);
    }
    setSubmiting(false);
  };

  const handleCloseForm = () => {
    onHide();
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        right: "0",
        width: "400px",
        height: "100vh",
        background: "white",
        zIndex: "100",
        boxShadow: "1px 5px 8px rgba(255, 001, 80, 0.1)",
        transition: "0.5s",
        padding: "20px",
      }}
    >
      <Box
        component={`form`}
        onSubmit={handleSubmit}
        sx={{
          width: "400px",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>ADD PRODUCT</h3>
        <TextField
          value={form.name}
          onChange={handleChange}
          type="text"
          name="name"
          required
          fullWidth
          placeholder="Product name"
          margin="normal"
        />
        <TextField
          value={form.desc}
          onChange={handleChange}
          type="text"
          name="desc"
          required
          fullWidth
          placeholder="Descriptions"
          margin="normal"
        />
        <TextField
          value={form.price}
          onChange={handleChange}
          type="number"
          name="price"
          required
          fullWidth
          placeholder="Price"
          margin="normal"
        />
        <TextField
          value={form.stock}
          onChange={handleChange}
          type="number"
          name="stock"
          required
          fullWidth
          placeholder="Stock"
          margin="normal"
        />
        <Button disabled={submiting} type="submit">
          {submiting ? "ADDING..." : "ADD PRODUCT"}
        </Button>
        <Button type="button" color="secondary" onClick={handleCloseForm}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
