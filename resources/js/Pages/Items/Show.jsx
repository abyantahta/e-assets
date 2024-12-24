import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { EyeIcon, PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
// import th from "@/Components/th";
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
            <div className="relative mt-20 max-w-[90rem] mx-auto pb-8">
                <div className=" z-10 md:mx-auto md:max-w-2xl flex flex-col items-center bg-lightTheme drop-shadow-lg py-12 px-4 md:px-24 mx-8">
                    <h1 className="text-greenTheme text-center font-bold text-5xl">{no_asset}</h1>
                    <h3 className="text-redTheme font-bold mt-1 text-brownTheme text-lg text-center">{name}</h3>
                    <table className="mt-2 font-playfairDisplay text-xl tracking-wider">
                        <thead>
                            <tr>
                                <td className="font-bold">Service Date</td>
                                <td>: {new Date(service_date).toLocaleDateString()}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-bold">Cost</td>
                                <td>: Rp. {Intl.NumberFormat('en-DE').format(cost)}</td>
                            </tr>
                            <tr>
                                <td className="font-bold ">Kategori</td>
                                <td className=""> : {category_id.name}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">NBV</td>
                                <td>: Rp. {Intl.NumberFormat('en-DE').format(nbv)}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Lokasi</td>
                                <td className="">: {lokasi}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className="w-full px-8">
                    <div className=" w-full overflow-x-auto mt-8">
                        {
                            showHistory && (
                                (transactions.data.length !== 0) ?  (
                                <table className=' mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1'>
                                    <thead className='overflow-auto'>
                                        <tr className='min-w-full flex text-center gap-3 !font-semibold'>
                                            {/* <th className='bg-white text-white w-12 h-11 flex items-center !font-semibold justify-center sticky pr-2 left-0 top-0 -mr-2'>
                                                <span className='w-9 h-11 bg-greenTheme rounded-md'>
                                                </span>
                                            </th> */}
                                            <th
                                                name="id"
                                                className=" bg-greenTheme text-white w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No
                                            </th>
                                            <th
                                                name="created_at"
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Date
                                            </th>
                                            <th
                                                name="created_at"
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No Asset
                                            </th>
                                            {/* <th className='bg-greenTheme text-white w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                            <th
                                                name="name"
                                                className=" bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Nama Aset
                                            </th>
                                            <th
                                                name="category_id"
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Category
                                            </th>
                                            <th
                                                name="kondisi"
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kondisi
                                            </th>
                                            <th
                                                name="lokasi"
                                                className=" bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Lokasi
                                            </th>
                                            <th
                                                name="pic"
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                PIC
                                            </th>
                                            <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">Created By</th>
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-auto box-border no-scrollbar'>
                                        {transactions.data.map((transaction, index) => (
                                            <tr className="min-w-full flex text-center gap-3 mt-3" key={transaction.item_id.no_asset} >
                                                {/* <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} sticky -mr-2 left-0 top-0 h-11 py-2 text-ellipsis overflow-hidden text-nowrap flex items-center  w-12`}>
                                                    <Link href={route("items.show", transaction.id)} className='bg-orangeTheme hover:brightness-110 duration-200 p-1 w-fit font-bold text-white rounded-[0.25rem] flex items-center justify-center'> <Squares2X2Icon className='w-7 text-white' /> </Link>
                                                </td> */}
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-16`}>{transaction.id}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{new Date(transaction.created_at).toLocaleDateString()}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{transaction.item_id.no_asset}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-52`}> {transaction.item_id.name} </td>
                                                <td className={` ${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}> {transaction.item_id.category_id?.name} </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}>{transaction.kondisi}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-32`}>{transaction.lokasi}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{transaction.pic}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{transaction.user_id.name}</td> {/* <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-48`}>{transactions.lokasi}</td> */}
                                            </tr>))}
                                        {/* </tr> */}
                                    </tbody>
                                </table>
                                ):(
                                    <h1 className="text-center bg-red-400 text-white py-2 font-bold">Item ini belum pernah di STO</h1>
                                )
                            )
                        }
                        {/* <h3>hei</h3> */}
                    </div>
                    <div className="mt-1 flex flex-col md:flex-row justify-center gap-4">
                        {
                            !showHistory && (
                                <button onClick={() => viewHistory()} className="py-3 md:py-1 w-full md:w-48 -mb-4 md:mb-0 bg-orangeTheme font-semibold tracking-wider text-white rounded-md flex items-center gap-2 justify-center">
                                    <EyeIcon className="w-6" />
                                    STO History
                                </button>

                            )
                        }
                        <Link href={route("transactions.show", `${encrypted_no_asset}${no_asset}`)} className="py-2 mt-3 md:mt-0 md:py-1 w-full md:w-48 text-center bg-brownTheme text-white font-semibold flex items-center justify-center gap-2  rounded-md">
                            <PlusIcon className="w-8" />
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
