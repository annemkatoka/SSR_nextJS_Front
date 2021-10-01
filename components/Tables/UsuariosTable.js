import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Swal from "sweetalert2";
import Select from "@material-ui/core/Select";

//iconos Material UI
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewListIcon from "@material-ui/icons/ViewList";
import SearchIcon from "@material-ui/icons/Search";

//Conexión Axios
import clienteAxios from "../../config/axios";

//Estilos
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//Columnas que se mostraran en la Tabla de Usuarios
const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "username", label: "USERNAME", minWidth: 150, align: "center" },
  {
    id: "access_level",
    label: "ACCESS LEVEL",
    minWidth: 150,
    align: "center",
  },
  {
    id: "perfil",
    label: "PERFIL",
    minWidth: 150,
    align: "center",
  },
  { id: "acciones", label: "" },
];

//Paginación de la tabla
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ marginLeft: theme.spacing(1.5), flexShrink: 0 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UsuariosTable() {
  const [listadoUsuarios, setlistadoUsuarios] = useState([]);
  const [filterDisplay, setFilterDisplay] = useState([]);

  const UsuariosList = async () => {
    const usuariosConsulta = await clienteAxios.get("/usuarios");
    debugger;
    //Guardar Resultado de Consulta en el State
    setlistadoUsuarios(usuariosConsulta.data);
    setFilterDisplay(usuariosConsulta.data);
  };

  useEffect(() => {
    UsuariosList();
  }, []);

  //Routing
  const router = useRouter();

  //Buscador
  const hangleChangeData = (e) => {
    console.log("Change Data in the state");
    let oldList = listadoUsuarios.map((usuario) => {
      return usuario;
    });

    if (e !== "") {
      let newList = [];

      newList = oldList.filter((usuario) =>
        usuario.username.includes(e.trim())
      );
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(listadoUsuarios);
    }
  };

  //Eliminar Dato
  const handleDelete = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`/personas/${id}`);
      console.log(respuesta);
      Swal.fire("Eliminada!", "Persona eliminada de la base!", "success");

      setTimeout(() => {
        router.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un Error",
        text: error.response.data.message,
      });
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filterDisplay.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();

  return (
    <>
      <TableContainer component={Paper}>
        <div
          align="right"
          className="pb-3"
        >
          <FormControl
            style={{
              marginBottom: theme.spacing(1.5),
              marginTop: theme.spacing(1.5),
              marginRight: theme.spacing(1.5),
              width: "25ch",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <InputLabel htmlFor="buscar-input">Buscar</InputLabel>

            <Input
              id="buscar-input"
              onChange={(e) => hangleChangeData(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <Table size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {
              //Personas
              (rowsPerPage > 0
                ? filterDisplay.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filterDisplay
              ).map((filterDisplay) => (
                <StyledTableRow key={filterDisplay.id}>
                  <StyledTableCell>
                    {filterDisplay.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {filterDisplay.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {filterDisplay.access_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {filterDisplay.perfil}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="edit">
                      <EditIcon style={{ fill: "blue" }} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        handleDelete(filterDisplay.id);
                      }}
                    >
                      <DeleteIcon style={{ fill: "red" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage=""
                rowsPerPageOptions={[5, 10, 25]}
                count={filterDisplay.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
