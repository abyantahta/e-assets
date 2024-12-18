import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { EyeIcon, PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
// import TasksTable from "../Task/TasksTable";


export default function Show({ auth, item, transactions }) {
    let [showHistory, setShowHistory] = useState(null);
    console.log('auth', auth)
    console.log('transactions', transactions)
    // dd()
    console.log(auth.user)
    let { id, encrypted_no_asset, no_asset, name, category_id, cost, isDisposition, lokasi, nbv, service_date } = item.data[0]

    const viewHistory = () => {
        // if(!auth) return to_route('items.index');
        setShowHistory(true);
        // if(transactions)
    }
    let content = (
        <>
            <Head title={`Project "${name}"`} />
            <div className="relative mt-20 max-w-6xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-tr from-greenTheme to-green-200 rounded-full absolute -top-3 -left-5 "></div>
                <div className="w-20 h-20 bg-gradient-to-tr from-redTheme to-red-200 rounded-full absolute -bottom-2 -right-7 "></div>

                <div className=" z-10 backdrop-blur-md flex flex-col items-center bg-white bg-opacity-40 rounded-xl border-white border-2 backdrop:blur-xl py-12 px-4 md:px-24 mx-8">
                    <h1 className="text-greenTheme text-center font-bold text-4xl">{no_asset}</h1>
                    <h3 className="text-redTheme font-bold mt-1  text-center">{name}</h3>
                    <table className="mt-2 text-sm">
                        <thead>
                            <tr>
                                <td className="font-bold">Kategori</td>
                                <td>: {category_id.name}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-bold">Lokasi</td>
                                <td>: {lokasi}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Cost</td>
                                <td>: Rp. {Intl.NumberFormat('en-DE').format(cost)}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">NBV</td>
                                <td>: Rp. {Intl.NumberFormat('en-DE').format(nbv)}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Service Date</td>
                                <td>: {new Date(service_date).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className=" w-full overflow-x-auto mt-8">
                        {
                            showHistory && (
                                (transactions.data.length !== 0) ?  (
                                    <table className="table-fixed w-full overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="text-nowrap">
                                                {/* <TableHeading
                                                    name="id"
                                                    // sort_field={queryParams.sort_field}
                                                    // sort_direction={queryParams.sort_direction}
                                                    // sortChanged={sortChanged}
                                                    className=" w-16"
                                                >
                                                    ID
                                                </TableHeading> */}
                                                {/* <TableHeading
                                                    name="date"
                                                    // sort_field={queryParams.sort_field}
                                                    // sort_direction={queryParams.sort_direction}
                                                    // // sortChanged={sortChanged}
                                                    className=" w-28"
                                                >
                                                    Date
                                                </TableHeading> */}
                                                <th className="w-16 px-3 py-3">ID</th>
                                                <th className="w-28 px-3 py-3">Date</th>
                                                <th className="w-32 px-3 py-3">No Asset</th>
                                                {/* <TableHeading
                                                    name="nama_asset"
                                                    // sort_field={queryParams.sort_field}
                                                    // sort_direction={queryParams.sort_direction}
                                                    // // sortChanged={sortChanged}
                                                    className=" w-56 text-ellipsis"
                                                >
                                                    Nama Aset
                                                </TableHeading> */}
    
                                                {/* <TableHeading
                                                    name="category"
                                                    // sort_field={queryParams.sort_field}
                                                    // sort_direction={queryParams.sort_direction}
                                                    // // sortChanged={sortChanged}
                                                    className=" w-40 text-ellipsis"
                                                >
                                                    Category
                                                </TableHeading> */}
                                                {/* <th className="px-3 py-3">Cost</th> */}
                                                {/* <th className="w-28 text-center text-ellipsis">Kategori</th> */}
                                                <th className="w-56 text-center text-ellipsis overflow-hidden">Nama Aset</th>
                                                <th className="w-28 text-center text-ellipsis">Kondisi</th>
                                                <th className="w-28 text-center text-ellipsis">Kategori</th>
                                                <th className="w-28 text-center text-ellipsis">Lokasi</th>
                                                <th className="w-28 text-center text-ellipsis">PIC</th>
                                                <th className="px-3 py-3 w-28 text-center">Created By</th>
                                                {/* <th className="px-3 py-3 w-28 text-center">Updated By</th> */}
                                                {
                                                    auth.user.role === 'admin' && (
                                                        <th className="px-3 py-3 w-24  text-center">Action</th>
                                                    )
                                                }
                                            </tr>
                                        </thead>
    
                                        <tbody>
                                            {transactions.data.map((transaction, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                    key={transaction.id}
                                                >
                                                    <td className="px-3 py-2 text-center">{index + 1}</td>
                                                    <td className="px-3 py-2 text-ellipsis overflow-hidden">{new Date(transaction.created_at).toLocaleDateString()}</td>
                                                    <td className="px-3 py-2">{no_asset}</td>
                                                    <td className="px-3 py-2">{name}</td>
                                                    <td className="px-3 py-2 text-nowrap text-ellipsis overflow-hidden ">
                                                        {category_id.name}
                                                    </td>
                                                    <td className="px-3 py-2 text-ellipsis overflow-hidden text-nowrap  ">
                                                        {transaction.kondisi}
                                                    </td>
                                                    <td className="px-3 py-2 text-ellipsis overflow-hidden ">{transaction.lokasi}</td>
                                                    <td className="px-3 py-2 text-ellipsis overflow-hidden ">{transaction.pic}</td>
                                                    <td className="px-3 py-2 text-ellipsis overflow-hidden text-center">{transaction.user_id.name}</td>
                                                    {/* <td className="px-3 py-2 text-ellipsis overflow-hidde text-center">{transaction.nbv}</td>
                                                            <td className="px-3 py-2 text-ellipsis overflow-hidden text-center">{transaction.lokasi}</td> */}
                                                    {
                                                        auth.user.role === 'admin' && (
                                                            <td className="px-3 py-2 overflow-hidden flex gap-2">
                                                                <Link href={route("transactions.edit", transaction.id)} className='bg-yellow-400 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
                                                                    {/* <Squares2X2Icon className='w-5 text-white' />   */}
                                                                    <PencilIcon className='w-5' />
                                                                </Link>
                                                                <button onClick={(e) => deleteTransaction(transaction)} className='bg-red-400 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
                                                                    {/* <Squares2X2Icon className='w-5 text-white' />   */}
                                                                    <XMarkIcon className='w-5' />
                                                                </button>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ):(
                                    <h1 className="text-center bg-red-400 text-white py-2 font-bold">Item ini belum pernah di STO</h1>
                                )
                            )
                        }
                        {/* <h3>hei</h3> */}
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        {
                            !showHistory && (
                                <button onClick={() => viewHistory()} className="py-1 w-36 bg-blue-400 text-sm font-bold text-white rounded-md flex items-center gap-2 justify-center">
                                    <EyeIcon className="w-6" />
                                    STO History
                                </button>

                            )
                        }
                        <Link href={route("transactions.show", `${encrypted_no_asset}${no_asset}`)} className="py-1 w-36 text-center bg-yellow-400 font-bold flex items-center justify-center gap-2 text-gray-600 rounded-md">
                            <PlusIcon className="w-6" />
                            Add STO
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )

    if (!auth.user) {
        return (
            // <h1>hai</h1>
            <GuestLayout>
                {content}
            </GuestLayout>
        );
    } else {
        return (
            <AuthenticatedLayout>
                {content}
            </AuthenticatedLayout>
        )
    }
}
