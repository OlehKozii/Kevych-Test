import React, { ReactElement, useEffect } from "react";

import UpdateTrainModal from "./UpdateTrainModal.tsx";
import axios from "../utils/axios.ts";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Box from "@mui/material/Box";
import AddTrainModal from "./AddTrainModal.tsx";

export interface ITrain {
  id: number;
  num: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
}
export default function DataTable(): ReactElement<any, any> {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [train, setTrain] = React.useState<ITrain>({
    id: -1,
    num: 0,
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [rows, setRows] = React.useState<ITrain[]>([]);

  const [openAddTrain, setOpenAddTrain] = React.useState(false);
  const [openEditTrain, setOpenEditTrain] = React.useState(false);

  useEffect(() => {
    getTrains();
    console.log("Test");
  }, []);

  async function getTrains() {
    const res = await axios.get(``);
    if (res.status === 200) {
      setRows([...res.data]);
      console.log(rows);
      setLoading(false);
    }
  }
  const handleUpdate = async (updateObject: Partial<ITrain>) => {
    const res = await axios.put(`/${train.id}`, updateObject);
    if (res.status === 200) {
      await getTrains();
    }
  };

  const handleCreate = async (createObject: Partial<ITrain>) => {
    const res = await axios.post(``, createObject);
    console.log(res.status);
    if (res.status === 200) {
      console.log(res.data);
      setRows([...rows, res.data]);
    }
  };

  async function handleDelete(id: number) {
    const res = await axios.delete(`/${id}`);
    if (res.status === 200) {
      setRows(rows.filter((elem) => elem.id !== id));
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Paper>
          <Box textAlign="left">
            <Button variant="contained" onClick={() => setOpenAddTrain(true)}>
              +
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Departure</TableCell>
                  <TableCell>Arrival</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.num}</TableCell>
                      <TableCell>{row.from}</TableCell>
                      <TableCell>{row.to}</TableCell>
                      <TableCell>{row.departureTime}</TableCell>
                      <TableCell>
                        {row.arrivalTime}
                        {row.arrivalTime < row.departureTime ? "(+1 day)" : ""}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon></DeleteIcon>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => {
                            setTrain(row);
                            setOpenEditTrain(true);
                          }}
                        >
                          <UpgradeIcon></UpgradeIcon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell>No avaliable trains</TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <UpdateTrainModal
            open={openEditTrain}
            setOpen={setOpenEditTrain}
            train={train}
            handleUpdate={handleUpdate}
          />
          <AddTrainModal
            open={openAddTrain}
            setOpen={setOpenAddTrain}
            handleCreate={handleCreate}
          />
        </Paper>
      )}
    </>
  );
}
