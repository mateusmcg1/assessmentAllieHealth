import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthdate: string;
  }[];
};

export default function UsersTable({ users }: Props) {
  const navigate = useNavigate();
  const handleEditClick = (userId: number) => {
    navigate (`/update/${userId}`);
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell align="center">Email</TableHeaderCell>
            <TableHeaderCell align="right">Birthdate</TableHeaderCell>
            <TableHeaderCell align="right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${user.first_name} ${user.last_name}`}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="right">
                {format(new Date(user.birthdate), "MM/dd/yyyy")}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClick(user.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
