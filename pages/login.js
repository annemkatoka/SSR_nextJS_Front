import React, { useState, useContext } from "react";
import Layout from '../components/Layout'
import clienteAxios from '../config/axios';
import Swal from  'sweetalert2';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';


const Login = () => {

    //Routing
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: '',
            sena: ''

        },
        onSubmit: async valores => {
            console.log(formik.values)
            try {
                const respuesta = await clienteAxios.post('/iniciar-sesion', formik.values);
                console.log(respuesta);

                Swal.fire(
                    'Login Correcto',
                    'Has iniciado Sesión',
                    'success'
                )

                const { token } = respuesta.data;
                localStorage.setItem('token', token);

                console.log(token);

                
                saveAuth({
                    token,
                    auth: true
                })

                //Redireccionar
                setTimeout(() => {
                    router.push('/');
                });


            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un Error',
                    text: error.response.data.message
                })

            }
        }
    })

    console.log(formik.values)

  return (
    <div>
      <Layout>
        <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="w-1/3">
            <form className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="font-bold text-grey-darker block mb-2">Nombre de Usuario</label>
                    <input type="text" 
                    id="username"
                    className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                     placeholder="User"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.username}/>
                </div>

                {
                    formik.touched.username && formik.touched.error ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p> {formik.error.username}</p>
                        </div>
                    ) : null
                }

                <div className="mb-4">
                    <label className="font-bold text-grey-darker block mb-2">Contraseña</label>
                    <input type="text"
                    id="sena"
                    className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" 
                    placeholder="Pass"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sena}/>
                </div>

                {
                    formik.touched.sena && formik.touched.error ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p> {formik.error.sena}</p>
                        </div>
                    ) : null
                }


                <div className="flex items-center justify-center">
                    <button type="submit " className="bg-teal-dark border-t-12 bg-gray-400 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100 font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
                
            </form>
        </div>
    </div>
      </Layout>
    </div>
  );
};

export default Login;