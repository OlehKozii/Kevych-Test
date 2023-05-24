import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

import DataTable from "./components/TrainTable.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const theme = createTheme({
    direction: "rtl",
    // other theme properties
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DataTable />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
export default App;
