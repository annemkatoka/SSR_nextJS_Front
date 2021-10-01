import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";

import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";




const nuevaPersona = () => {
  //State para el cambio de estilo de acuerdo a si es fisico/juridico
  const [tipoRazonSocial, setTipoRazonSocial] = useState(
    "inline-block mt-3 pr-1 w-5/12"
  );
  const [tipoNroDocumento, setTipoNroDocumento] = useState(
    "inline-block pr-1 w-3/12"
  );
  const [tipoRuc, setTipoRuc] = useState("inline-block w-3/12");
  const [tipoDV, setTipoDV] = useState("inline-block pl-1 w-1/12");

  //Routing
  const router = useRouter();

  //Validaciones
  const formik = useFormik({
    initialValues: {
      razon_social: "",
      nro_documento: "",
      ruc: "",
      dv: "",
      email: "",
      telefono: "",
      celular: "",
      direccion: "",
      nro_casa: "",
      id_pais: "",
      id_departamento: "",
      id_distrito: "",
      id_ciudad: "",
      tipo_documento: 1,
      naturaleza: "c",
      tipo_contribuyente: "f",
    },
    validationSchema: Yup.object({
      razon_social: Yup.string()
        .required("Campo Obligatorio!")
        .max(255, "Tamaño máximo Excedido!"),
      nro_documento:
        tipoNroDocumento == "hidden"
          ? null
          : Yup.string().required("Campo Obligatorio!"),
      ruc:
        tipoRuc == "hidden"
          ? null
          : Yup.string().required("Campo Obligatorio!").matches(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]+/, "RUC no válido!"),
      
      dv:
        tipoDV == "hidden" ? null : Yup.string().required("Campo Obligatorio!"),
      email: Yup.string().email("Correo no válido!"),
      id_pais: Yup.number().required("Campo Obligatorio!"),
      id_departamento: Yup.number().required("Campo Obligatorio!"),
      id_distrito: Yup.number().required("Campo Obligatorio!"),
      id_ciudad: Yup.number().required("Campo Obligatorio!"),
      dv: Yup.string().required("Campo Obligatorio!").matches(/[0-9]/, "DV no válido!"),
      direccion: Yup.string().required("Campo Obligatorio!"),

    }),
    onSubmit: async (valores) => {
      try {
        const respuesta = await clienteAxios.post("/personas", formik.values);
        console.log(respuesta);
        Swal.fire("Guardado!", "Persona insertada en la Base", "success");

        //Redireccionar
        setTimeout(() => {
          router.push("/personas");
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: error.response.data.message,
        });
      }
    },
  });

  //State de Paises, Departamentos, Distritos, Ciudades, Tipo Documento
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [tipoDoc, setTipoDoc] = useState([]);

  /***************************/
  const listaPaisAPI = async () => {
    const paisesConsulta = await clienteAxios.get("/paises");
    //Guardar Resultado de Consulta en el State
    setPaises(paisesConsulta.data);
  };

  const listaDepartamentosAPI = async (pais) => {
    const departamentosConsulta = await clienteAxios.get(
      `/departamentos/${pais}`
    );
    //Guardar Resultado de Consulta en el State
    setDepartamentos(departamentosConsulta.data);
  };

  const listaDistritosAPI = async (departamento) => {
    const distritosConsulta = await clienteAxios.get(
      `/distritos/${departamento}`
    );
    //Guardar Resultado de Consulta en el State
    setDistritos(distritosConsulta.data);
  };

  const listaCiudadesAPI = async (distrito) => {
    const ciudadesConsulta = await clienteAxios.get(`/ciudades/${distrito}`);
    //Guardar Resultado de Consulta en el State
    setCiudades(ciudadesConsulta.data);
  };

  const listaTipoDocAPI = async () => {
    const tipoDocConsulta = await clienteAxios.get("/tipo-documento");
    //Guardar Resultado de Consulta en el State
    setTipoDoc(tipoDocConsulta.data);
  };

  useEffect(() => {
    listaPaisAPI();
    listaTipoDocAPI();
  }, []);
  /**************************/

  const contribuyente = (
    <div className="inline-block mt-2 w-1/3 pr-1">
      <label className="inline-block font-serif text-sm text-black">TIPO</label>
      <select
        id="tipo_contribuyente"
        onChange={(e) => {
          formik.handleChange(e);
          handleChangeTipoContribuyente(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.tipoContribuyente}
        className="inline-block relative w-64 w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="f">Físico</option>
        <option value="j">Jurídico</option>
      </select>
    </div>
  );

  const [LabelTipoPersona, setLabelTipoPersona] = useState("");
  var [Tipo, setTipo] = useState(contribuyente);

  function handleChangeTipoContribuyente(e) {
    if (e.target.value == "f") {
      setTipoRazonSocial("inline-block mt-3 pr-1 w-5/12");
      setTipoNroDocumento("inline-block pr-1 w-3/12");
      setTipoRuc("inline-block w-3/12");
      setTipoDV("inline-block pl-1 w-1/12");
    } else {
      setTipoRazonSocial("inline-block mt-3 w-8/12");
      setTipoNroDocumento("hidden");
      setTipoRuc("inline-block pl-1 w-3/12");
      setTipoDV("inline-block pl-1 w-1/12");
    }
  }

  function toggleCheckedContribuyente(e) {
    if (e.target.value == "c") {
      //Contribuyente
      setTipo(contribuyente);
      setTipoRazonSocial("inline-block mt-3 pr-1 w-5/12");
      setTipoNroDocumento("inline-block pr-1 w-3/12");
      setTipoRuc("inline-block w-3/12");
      setTipoDV("inline-block pl-1 w-1/12");
      setLabelTipoPersona("");
    } else {
      //No Contribuyente
      setLabelTipoPersona(
        <p className="text-gray-500 font-serif text-center font-medium text-2xl mb-3 text-black">
          Persona Física
        </p>
      );
      setTipo("");
      setTipoRazonSocial("inline-block w-2/3 pr-1");
      setTipoNroDocumento("inline-block mt-2 -mx-1 pl-1 w-1/3");
      setTipoRuc("hidden");
      setTipoDV("hidden");
    }
  }

  function handleChangePais(e) {
    console.log(e.target.value);
    const pais = e.target.value;
    listaDepartamentosAPI(pais);
  }

  function handleChangeDepartamento(e) {
    console.log(e.target.value);
    const departamento = e.target.value;
    listaDistritosAPI(departamento);
  }

  function handleChangeDistrito(e) {
    console.log(e.target.value);
    const distrito = e.target.value;
    listaCiudadesAPI(distrito);
  }

  return (
    <div>
      <Layout>
        <div className="w-full container flex justify-center">
          <form
            className="bg-gray-300 w-4/6 m-4 p-10 bg-white rounded shadow-xl"
            onSubmit={formik.handleSubmit}
          >
            <nav className="flex justify-center content-start p-1 bg-gradient-to-t from-gray-900 via-gray-700  to-gray-900 ">
              <p className="text-gray-200 font-serif font-medium text-center text-2xl">
                Personas
              </p>
            </nav>
            <div className="mt-2 inline-block w-1/3 pr-1">
              <label className="inline-block font-serif text-sm text-black">
                NATURALEZA
              </label>
              <select
                id="naturaleza"
                onChange={(e) => {
                  formik.handleChange(e);
                  toggleCheckedContribuyente(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.naturaleza}
                className="inline-block relative w-64 w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline bg-white"
              >
                <option value="c">Contribuyente</option>
                <option value="n">No Contribuyente</option>
              </select>
            </div>
            {Tipo}
            <div className="mt-2 inline-block w-1/3 pr-1">
              <label className="inline-block font-serif text-sm text-black">
                TIPO DOCUMENTO
              </label>
              <select
                id="tipo_documento"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tipoDoc}
                className="inline-block relative w-64 w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {tipoDoc.map((tipo) => (
                  <option key={tipo.id_tipo_doc} value={tipo.id_tipo_doc}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className={tipoRazonSocial}>
              <label className="block font-serif text-sm text-blacke">
                RAZÓN SOCIAL
                {formik.touched.razon_social && formik.errors.razon_social ? (
                  <div className="ml-1 border-l-4 text-xs border-red-500 text-red-700">
                    <p className="ml-1">{formik.errors.razon_social}</p>
                  </div>
                ) : null}
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="razon_social"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.razon_social}
              />
            </div>

            <div className={tipoNroDocumento}>
              <label className="block font-serif text-sm text-black">
                NRO DOCUMENTO
                {formik.touched.nro_documento && formik.errors.nro_documento ? (
                  <div className="ml-1 border-l-4 border-red-500 text-xs text-red-700">
                    <p className="ml-1">{formik.errors.nro_documento}</p>
                  </div>
                ) : null}
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="nro_documento"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nro_documento}
              />
            </div>
            <div className={tipoRuc}>
              <label className="block font-serif text-sm text-black">
                RUC
                {formik.touched.ruc && formik.errors.ruc ? (
                  <div className="ml-1 border-l-4 border-red-500 text-xs text-red-700">
                    <p className="ml-1">{formik.errors.ruc}</p>
                  </div>
                ) : null}
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="ruc"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ruc}
              />
            </div>
            <div className={tipoDV}>
              <label className="block font-seriftext-sm text-black">
                DV
                {formik.touched.dv && formik.errors.dv ? (
                  <div className="ml-1 border-l-4 border-red-500 text-red-700">
                    <p className="ml-1 text-xs">{formik.errors.dv}</p>
                  </div>
                ) : null}
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="dv"
                type="text"
                maxLength="1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dv}
              />
            </div>
            <div className="mt-2 inline-block pr-1 w-3/5">
              <label className="inline-block font-serif text-sm text-black">
                INFORMACIÓN DE CONTACTO
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className="ml-1 border-l-4 border-red-500 text-red-700">
                  <p className="ml-1 text-xs">{formik.errors.email}</p>
                </div>
              ) : null}
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="email"
                type="text"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mt-2 inline-block pr-1 w-1/5">
              <label className="hidden text-sm block text-gray-600">
                Teléfono
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="telefono"
                type="text"
                placeholder="Telefono"
                value={formik.values.tel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mt-2 inline-block w-1/5">
              <label className="hidden text-sm block text-gray-600">
                Calular
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="celular"
                type="text"
                placeholder="Celular"
                value={formik.values.cel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mt-2 inline-block w-1/4 pr-1">
              <label className="inline-block font-serif text-sm text-black">
                DIRECCIÓN
              </label>
              {formik.touched.id_pais && formik.errors.id_pais ? (
                <div className="ml-1 border-l-4 border-red-500 text-red-700">
                  <p className="ml-1 text-xs">{formik.errors.id_pais}</p>
                </div>
              ) : null}
              <select
                id="id_pais"
                type="number"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangePais(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.pais}
                className="inline-block relative w-64 w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="248">Pais</option>
                {paises.map((pais) => (
                  <option key={pais.id_pais} value={pais.id_pais}>
                    {pais.descpais}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 inline-block w-1/4 pr-1">
              {formik.touched.id_departamento &&
              formik.errors.id_departamento ? (
                <div className="ml-1 border-l-4 border-red-500 text-red-700">
                  <p className="ml-1 text-xs">
                    {formik.errors.id_departamento}
                  </p>
                </div>
              ) : null}
              <select
                id="id_departamento"
                type="number"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangeDepartamento(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.departamento}
                className="inline-block relative w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="9999">Departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.desc_dpto}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 inline-block w-1/4 pr-1">
              {formik.touched.id_distrito && formik.errors.id_distrito ? (
                <div className="ml-1 border-l-4 border-red-500 text-xs text-red-700">
                  <p className="ml-1">{formik.errors.id_distrito}</p>
                </div>
              ) : null}
              <select
                id="id_distrito"
                type="number"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangeDistrito(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.distrito}
                className="inline-block relative w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="9999">Distrito</option>
                {distritos.map((distrito) => (
                  <option
                    key={distrito.coddistrito}
                    value={distrito.coddistrito}
                  >
                    {distrito.desc_distrito}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 inline-block w-1/4">
              {formik.touched.id_ciudad && formik.errors.id_ciudad ? (
                <div className="ml-1 border-l-4 border-red-500 text-xs text-red-700">
                  <p className="ml-1">{formik.errors.id_ciudad}</p>
                </div>
              ) : null}
              <select
                id="id_ciudad"
                type="number"
                value={formik.values.ciudad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="inline-block relative w-full px-2 py-2 text-gray-700 bg-white rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="9999">Ciudad</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.id} value={ciudad.id}>
                    {ciudad.desc_ciudad}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mt-2 inline-block w-3/4  pr-1">
                <label className="hidden text-sm block text-gray-600">
                  Calle
                </label>
                {formik.touched.direccion && formik.errors.direccion ? (
                <div className="ml-1 border-l-4 border-red-500 text-xs text-red-700">
                  <p className="ml-1">{formik.errors.direccion}</p>
                </div>
              ) : null}
                <input
                  className="w-full px-2 py-2 text-gray-900 bg-white rounded"
                  id="direccion"
                  type="text"
                  placeholder="Calle"
                  value={formik.values.calle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mt-2 inline-block w-1/4 ">
                <input
                  className="w-full px-2 py-2 text-gray-900 bg-white rounded"
                  id="nro_casa"
                  type="number"
                  placeholder="Número de Casa"
                  maxLength="5"
                  value={formik.values.nrocasa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                className="px-4 py-1 text-white tracking-wider bg-gray-900 rounded "
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default nuevaPersona;
