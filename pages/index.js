import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Layout>
      <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-green-600"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Ventas</h5>
                                <h3 className="font-bold text-3xl">$3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-orange-600"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Clientes</h5>
                                <h3 className="font-bold text-3xl">249 <span className="text-orange-500"><i className="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Nuevos Clientes</h5>
                                <h3 className="font-bold text-3xl">2 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-blue-600"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Proveedores</h5>
                                <h3 className="font-bold text-3xl">152</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">To Do List</h5>
                                <h3 className="font-bold text-3xl">7 tasks</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-red-600"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">Issues</h5>
                                <h3 className="font-bold text-3xl">3 <span className="text-red-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
</div>
                
      </Layout>
    </div>
  )
}
