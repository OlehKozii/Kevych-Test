import React, { useEffect } from "react";

import { ITrain } from "./TrainTable.tsx";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  open: React.ComponentState;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  train: ITrain;
  handleUpdate: any;
}

export default function UpdateTrainModal({
  open,
  setOpen,
  train,
  handleUpdate,
}: IProps) {
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");
  const [arrivalTime, setArrivalTime] = React.useState<Dayjs | null>(
    dayjs("00:00:00", "HH:mm:ss")
  );
  const [departureTime, setDepartureTime] = React.useState<Dayjs | null>(
    dayjs("00:00:00", "HH:mm:ss")
  );

  useEffect(() => {
    handleReset();
  }, [open]);

  const handleReset = () => {
    setFrom(train.from);
    setTo(train.to);
    setDepartureTime(dayjs(train.departureTime, "HH:mm:ss"));
    setArrivalTime(dayjs(train.arrivalTime, "HH:mm:ss"));
  };

  const updateTrain = async () => {
    await handleUpdate({
      from,
      to,
      arrivalTime: dayjs(arrivalTime).format("HH:mm:ss"),
      departureTime: dayjs(departureTime).format("HH:mm:ss"),
    });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Train №{train.num}
          </Typography>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <Box
              component="form"
              noValidate
              onSubmit={async (e) => {
                e.preventDefault();
                await updateTrain();
              }}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="from"
                    name="from"
                    required
                    fullWidth
                    id="from"
                    label="From"
                    autoFocus
                    value={from}
                    onChange={(e) => setFrom(e.currentTarget.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="to"
                    label="To"
                    name="to"
                    autoComplete="To"
                    value={to}
                    onChange={(e) => setTo(e.currentTarget.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimeField
                    label="Departure Time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e)}
                    format="HH:mm:ss"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimeField
                    label="Arrival Time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e)}
                    format="HH:mm:ss"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, mr: 1 }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update train
              </Button>
            </Box>
            <Button onClick={handleClose}>Cancel</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
