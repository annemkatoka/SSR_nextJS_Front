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
import Swal from "sweetalert2";

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

//Columnas que se mostraran en la Tabla de Personas
const columns = [
  { id: "detalle", label: "" },

  { id: "cod_interno_producto", label: "COD", minWidth: 50 },
  { id: "descripcion_producto", label: "DESCRIPCIÓN", minWidth: 150, align: "center" },
  {
    id: "tipo",
    label: "TIPO",
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

export default function ProductosTable() {
  //State para guardar productos de la base
  const [listadoProductos, setlistadoProductos] = useState([]);
  const [filterDisplay, setFilterDisplay] = useState([]);

  const ProductosList = async () => {
    const productosConsulta = await clienteAxios.get("/usuarios");
    //Guardar Resultado de Consulta en el State
    setlistadoProductos(productosConsulta.data);
    setFilterDisplay(productosConsulta.data);
  };

  useEffect(() => {
    ProductosList();
  }, []);

  //Routing
  const router = useRouter();

  //Buscador
  const hangleChangeData = (e) => {
    console.log("Change Data in the state");
    let oldList = listadoProductos.map((producto) => {
      return producto;
    });

    if (e !== "") {
      let newList = [];

      newList = oldList.filter((producto) =>
      producto.cod_interno_producto.includes(e.trim()) || producto.descripcion_producto.includes(e.trim())
      );
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(listadoProductos);
    }
  };

  //Eliminar Dato
  const handleDelete = async (id) => {
    try {
      const respuesta = await clienteAxios.delete(`/productos/${id}`);
      console.log(respuesta);
      Swal.fire("Eliminada!", "Producto eliminado de la base!", "success");

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
                <StyledTableRow key={filterDisplay.cod_interno_producto}>
                  <StyledTableCell style={{ width: 100 }}>
                    <IconButton aria-label="view">
                      <ViewListIcon style={{ fill: "blue" }} />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>
                    {filterDisplay.cod_interno_producto}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {filterDisplay.descripcion_producto}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {filterDisplay.tipo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="edit">
                      <EditIcon style={{ fill: "blue" }} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        handleDelete(filterDisplay.id_persona);
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
