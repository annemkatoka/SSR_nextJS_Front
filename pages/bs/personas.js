import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Table from "../../components/Tables/PersonasTable";


const Personas = () => {

  return (
    <div>
      <Layout>
        <Link href="/bs/nuevaPersona">
          <a className="align-center border-t-12 bg-gray-400 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100 font-bold py-2 px-4 rounded text-2xl text-gray-800 font-light">
            Nueva Persona
          </a>
        </Link>
        <div className="mt-5">
          <Table />

        </div>
      </Layout>
    </div>
  );
};

export default Personas;
