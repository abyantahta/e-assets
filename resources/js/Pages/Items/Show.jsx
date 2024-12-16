import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import TasksTable from "../Task/TasksTable";
export default function Show({auth,item}) {
    // dd()
    console.log(auth)
    let {id,encrypted_no_asset, no_asset,name,category_id,cost,isDisposition,lokasi,nbv,service_date} = item.data[0]
    return (
        // <h1>hai</h1>
        <AuthenticatedLayout
            user={auth.user}
            // header={
            //     <div className="flex items-center justify-between">
            //         <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            //             {`Project "${project.name}"`}
            //         </h2>
            //         <Link
            //             href={route("project.edit", project.id)}
            //             className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            //         >
            //             Edit
            //         </Link>
            //     </div>
            // }
        >
            <Head title={`Project "${name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div>
                            <img
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div> */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">No Asset</label>
                                        <p className="mt-1">{no_asset}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Item Name</label>
                                        <p className="mt-1">{name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Lokasi</label>
                                        <p className="mt-1">{lokasi}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Service Date</label>
                                        <p className="mt-1">{service_date}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Category</label>
                                        <p className="mt-1">{category_id.name}</p>
                                    </div>
                                    <div>
                                        <label className="font-bold text-lg">Disposal</label>
                                        <p className="mt-1">{isDisposition? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Cost</label>
                                        <p className="mt-1">{cost}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">NBV</label>
                                        <p className="mt-1">{nbv}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-14 flex justify-center gap-8">
                            <Link className="py-2 px-4 bg-blue-400 font-bold text-white rounded-md"> View STO History</Link>
                            <Link href={route("transactions.show", `${encrypted_no_asset}${no_asset}`)} className="py-2 px-4 bg-yellow-400 font-bold text-gray-600 rounded-md"> Add STO</Link>
                            {/* <Link> add STO</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable
                                tasks={tasks}
                                success={success}
                                queryParams={queryParams}
                                hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}