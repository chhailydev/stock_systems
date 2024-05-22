import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { UpdateAPI, GetByIdAPI } from "../../api/api";

const url: string = "http://localhost:8000";

interface PropsUpdatePoster {
  images: string;
  title: string;
  description: string;
}

interface Props {
  id: number;
  onHide: () => void;
}

const UpdatesPoster: React.FC<Props> = ({ id, onHide }) => {
  const [submiting, setSubmiting] = useState(false);
  const [form, setForm] = useState<PropsUpdatePoster>({
    images: "",
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchById = async () => {
    try {
      const res = await GetByIdAPI(`/poster/api/v1/${id}`);
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
      const res = await UpdateAPI(`/poster/api/v1/update/${id}`, form);
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
        <Box>
          <img src={`${url}${form?.images}`} alt="" />
        </Box>
        <TextField
          value={form.images}
          onChange={handleChange}
          type="text"
          name="images"
          required
          fullWidth
          placeholder="Images"
          margin="normal"
        />
        <TextField
          value={form.title}
          onChange={handleChange}
          type="text"
          name="title"
          required
          fullWidth
          placeholder="Title"
          margin="normal"
        />
        <TextField
          value={form.description}
          onChange={handleChange}
          type="text"
          name="description"
          required
          fullWidth
          placeholder="Description"
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

export default UpdatesPoster;
