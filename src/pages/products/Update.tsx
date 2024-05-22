import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { UpdateAPI, GetByIdAPI } from "../../api/api";

interface PropsUpdateProducts {
  name: string;
  desc: string;
  price: number;
  stock: number;
}

interface Props {
  id: number;
  onHide: () => void;
}

const Updates: React.FC<Props> = ({ id, onHide }) => {
  const [submiting, setSubmiting] = useState(false);
  const [form, setForm] = useState<PropsUpdateProducts>({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchById = async () => {
    try {
      const res = await GetByIdAPI(`/product/api/v1/products/${id}`);
      setForm(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchById();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setSubmiting(true);
      const res = await UpdateAPI(
        `/product/api/v1/products/update/${id}`,
        form
      );
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

  const handleClose = () => {
    onHide();
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        right: "0",
        height: "100vh",
        width: "400px",
        backgroundColor: "white",
        boxShadow: "1px 5px 8px rgba(255, 001, 80, 0.1)",
        zIndex: "100",
        transition: "0.5s",
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
        <h3 style={{ textAlign: "center" }}>UPDATE PRODUCT ID {id}</h3>
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
          {submiting ? "UPDATING..." : "UPDATE PRODUCT"}
        </Button>
        <Button onClick={handleClose} type="button">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Updates;
