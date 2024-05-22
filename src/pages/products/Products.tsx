import React from "react";
import { useState, useEffect } from "react";
import { GetAPI } from "../../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import AddProduct from "./AddProduct";
import { Delete, Edit } from "@mui/icons-material";
import Updates from "./Update";

interface PropsProducs {
  id: number;
  name: string;
  desc: string;
  price: number;
  stock: number;
}

const Products: React.FC = () => {
  const [pro, setPro] = useState<PropsProducs[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = pro.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pro.length / itemPerPage);

  const handlePageChange = (pigi: number) => {
    setCurrentPage(pigi);
  };

  const fetchData = async () => {
    await GetAPI("/product/api/v1/products/all/")
      .then((res) => {
        setPro(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleShowFormUp = (id: number) => {
    // setShowFormUp(true);
    setUpdateId(id);
  };

  const handleHideFormUp = () => {
    // setShowFormUp(false);
    setUpdateId(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleShowForm}>
        ADD PRODUCT
      </Button>
      {showForm && <AddProduct onHide={handleHideForm} />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>DESC</TableCell>
            <TableCell>PRICES</TableCell>
            <TableCell>STOCK</TableCell>
            <TableCell>ACTIVE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItem?.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{item?.id}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.desc}</TableCell>
                <TableCell>$ {item?.price}</TableCell>
                <TableCell>{item?.stock}</TableCell>
                <TableCell>
                  {updateId === item?.id && (
                    <Updates id={item?.id} onHide={handleHideFormUp} />
                  )}
                  <Button onClick={() => handleShowFormUp(item?.id)}>
                    <Edit />
                  </Button>
                  <Button>
                    <Delete color="secondary" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Products;
