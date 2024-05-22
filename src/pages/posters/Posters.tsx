import React from "react";
import { useState, useEffect } from "react";
import { GetAPI } from "../../api/api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import UpdatesPoster from "./UpdatePoster";

const url: string = "http://localhost:8000";

interface PropPoster {
  id: number;
  images: string;
  title: string;
  description: string;
}

const Posters: React.FC = () => {
  const [poster, setPoster] = useState<PropPoster[]>([]);
  const [currentPage] = useState(5);
  const [page, setPage] = useState<number>(1);
  const [UpdateId, setUpdateId] = useState(null);

  const indexOfLastItem = page * currentPage;
  const indexOfFirstItem = indexOfLastItem - currentPage;
  const currentItem = poster.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(poster.length / currentPage);

  const handlePageChanges = (pigi: number) => {
    setPage(pigi);
  };

  const fetchData = async () => {
    try {
      const res = await GetAPI("/poster/api/v1/all/");
      setPoster(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowUpdate = (id: number) => {
    setUpdateId(id);
  };

  const handleHideUpdate = () => {
    setUpdateId(null);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>POSTER</TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>ACTIVE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItem?.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell>{item?.id}</TableCell>
                <TableCell>
                  <img
                    width={150}
                    src={`${url}${item?.images}`}
                    alt={item?.title}
                  />
                </TableCell>
                <TableCell>{item?.title}</TableCell>
                <TableCell>{item?.description}</TableCell>
                <TableCell>
                  {UpdateId === item?.id && (
                    <UpdatesPoster id={item?.id} onHide={handleHideUpdate}/>
                  )} 
                  <Button color="primary" onClick={() => handleShowUpdate(item?.id)}>
                    <Edit />
                  </Button>
                  <Button color="secondary">
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button key={index} onClick={() => handlePageChanges(index + 1)}>
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Posters;
