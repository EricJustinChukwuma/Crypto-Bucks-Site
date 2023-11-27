import React from "react";
import Filters from "../Components/Filters";
import TableComponent from "../Components/TableComponent";
import { Outlet } from "react-router-dom";


const Crypto = () => {
  return (
    <section className="lg:w-[80%] w-full h-full flex flex-col mt-16 mb-24 relative lg:px-10 px-12">
      <Filters />
      <TableComponent />

      <Outlet />
    </section>
  )
}

export default Crypto