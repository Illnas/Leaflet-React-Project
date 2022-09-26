import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { Pagination } from "@mui/material";

const Tables = ({ dataCollection }) => {
  const itemsPerPage = 20;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(1);


  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (dataCollection) {
      setNoOfPages(Math.ceil(dataCollection.features.length / itemsPerPage));
    }
  }, [dataCollection]);

  return (
    <div className="table-container">
      <TableContainer component={Paper} className="tables">
        <Table>
          <TableHead>
            <TableRow className="header">
              <TableCell className="title">Naziv objekta</TableCell>
              <TableCell className="title" align="right">
                PS broj
              </TableCell>
              <TableCell className="title" align="right">
                E broj
              </TableCell>
              <TableCell className="title" align="right">
                Tip objekta
              </TableCell>
              <TableCell className="title" align="right">
                Lučka kapetanija
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCollection &&
              dataCollection.features
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((feature) => (
                  <TableRow
                    key={uuidv4()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="text" component="th" scope="row">
                      {feature.properties.naziv_objekta}
                    </TableCell>
                    <TableCell className="text" align="right">
                      {feature.properties.ps_br}
                    </TableCell>
                    <TableCell className="text" align="right">
                      {feature.properties.e_br}
                    </TableCell>
                    <TableCell className="text" align="right">
                      {feature.properties.tip_objekta}
                    </TableCell>
                    <TableCell className="text" align="right">
                      {feature.properties.lucka_kapetanija}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <div className="pagination">
          {dataCollection && (
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
            />
          )}
        </div>
      </TableContainer>
    </div>
  );
};

export default Tables;
