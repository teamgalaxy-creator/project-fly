import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontFamily:'Futura Bk BT',
    fontSize: 16,
    color: 'grey',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontFamily:'Futura Bk BT',

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  date: Date,
  planName: string,
  amount: number,
  
) {
  return { date, planName, amount };
}

const rows = [
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
  createData(new Date('June 25, 2023'), "Basic Plan", 23 ),
];

export default function TransactionHistory() {

  return (
    <TableContainer >
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Plan Name</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.amount}>
              <StyledTableCell component="th" scope="row">
                {row.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </StyledTableCell>
              <StyledTableCell align="center">{row.planName}</StyledTableCell>
              <StyledTableCell align="center">${row.amount}.00</StyledTableCell>              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

