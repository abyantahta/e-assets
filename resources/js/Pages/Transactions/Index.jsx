import DatePicker from '@/Components/DatePicker';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowDownOnSquareIcon, ArrowLeftStartOnRectangleIcon, PencilIcon, PlusIcon, XMarkIcon, } from '@heroicons/react/16/solid';
import { Head, router, Link } from '@inertiajs/react';
import moment from 'moment';

export default function Index({ auth, transactions, queryParams = null, success }) {
    // console.log(new Date(transactions.data[0].created_at))
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("transactions.index"), queryParams);
    };
    const exportTransaction = () => {
        router.get(route("transactions.fullsto"), queryParams);
    }
    const deleteTransaction = (transaction) => {
        if (!window.confirm("Are you sure you want to delete the transaction?")) {
            return;
        }
        router.delete(route("transactions.destroy", transaction.id));
    };
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };
    const queryParamsExport = () => {
        let string = "?";
        if (queryParams['category_id']) string += `&category_id=${queryParams['category_id']}`
        if (queryParams['dateStart']) string += `&dateStart=${queryParams['dateStart']}`
        if (queryParams['dateEnd']) string += `&dateEnd=${queryParams['dateEnd']}`
        return string
    }
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("transactions.index"), queryParams);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Items Page
                </h2>
            }
        >
            <Head title="Item" />
            <div className="py-12">
                <h1 className='text-5xl text-center font-semibold font-playfairDisplay text-greenTheme tracking-wider'>STO History</h1>
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-lightTheme dark:bg-gray-800 shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex flex-col gap-y-2 md:flex-row-reverse justify-between">
                                <TextInput
                                    className="w-full md:w-56 border-gray-700 border-[3px] placeholder:italic text-greenTheme font-normal focus:border-greenTheme focus:ring-greenTheme placeholder:text-greenTheme"
                                    defaultValue={queryParams.no_asset}
                                    placeholder="Search by no asset"
                                    onBlur={(e) =>
                                        searchFieldChanged("no_asset", e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("no_asset", e)}
                                />
                                <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
                                    <SelectInput
                                        className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme md:w-52"
                                        defaultValue={queryParams.category_id}
                                        onChange={(e) =>
                                            searchFieldChanged("category_id", e.target.value)
                                        }
                                    >
                                        <option value="">Category</option>
                                        <option value="1">Tooling</option>
                                        <option value="2">Tooling2</option>
                                        <option value="3">Tooling3</option>
                                        <option value="4">Building</option>
                                        <option value="5">Vehicle</option>
                                        {/* <option value="6">Office Equipment</option> */}
                                    </SelectInput>
                                    <DatePicker
                                        searchFieldChanged={searchFieldChanged}
                                        queryParams={queryParams}
                                    />
                                </div>
                            </div>
                            <div className="overflow-auto">
                                <table className=' mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1'>
                                    <thead className=' overflow-auto'>
                                        <tr className='min-w-full flex text-center gap-3 !font-semibold'>
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Date
                                            </TableHeading>
                                            {/* <th className='bg-greenTheme text-white w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                            <th className=' border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center'>
                                                <span className='bg-greenTheme  w-full h-11 flex items-center justify-center rounded-[0.25rem]'>
                                                    No Asset
                                                </span>
                                            </th>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Nama Aset
                                            </TableHeading>
                                            <TableHeading
                                                name="category_id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Category
                                            </TableHeading>
                                            <TableHeading
                                                name="kondisi"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kondisi
                                            </TableHeading>
                                            <TableHeading
                                                name="lokasi"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Lokasi
                                            </TableHeading>
                                            <TableHeading
                                                name="pic"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                PIC
                                            </TableHeading>
                                            <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">Created By</th>
                                            <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-auto box-border no-scrollbar'>
                                        {transactions.data.map((transaction, index) => (
                                            <tr className="min-w-full flex text-center gap-3 mt-3" key={transaction.id} >
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-16`}>{index + 1}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{moment(transaction.created_at).format('DD/MM/YYYY')}</td>
                                                <td className={` overflow-visible  h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}>
                                                    <span className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} border-greenTheme border-2 rounded-[0.25rem] w-full h-full inline-block px-3 py-2 `}>
                                                        {transaction.item_id.no_asset}
                                                    </span>
                                                </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-52`}> {transaction.item_id.name} </td>
                                                <td className={` ${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}> {transaction.item_id.category_id?.name} </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}>{transaction.kondisi}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-32`}>{transaction.lokasi}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{transaction.pic}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{transaction.created_by.name}</td>
                                                {
                                                    auth.user.role === 'admin' && (
                                                        <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-6 flex h-11 py-1 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>
                                                            <Link href={route("transactions.edit", transaction)} className='bg-yellow-500 hover:brightness-110 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
                                                                <PencilIcon className='w-5' />
                                                            </Link>
                                                            <button onClick={(e) => deleteTransaction(transaction)} className='bg-red-400 hover:brightness-125 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
                                                                <XMarkIcon className='w-5' />
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                            </tr>))
                                        }
                                        {/* </tr> */}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={transactions.meta.links} />
                            <div className="flex-col md:flex-row flex gap-4 md:w-fit ml-auto mt-6 mr-6  w-full">
                                <a href={`transactions/fullsto${queryParamsExport()}`} className="w-full md:w-72  py-3 px-4 tracking-wide text-center bg-orangeTheme font-bold flex items-center justify-center gap-2 text-white rounded-md hover:brightness-110 duration-150">
                                    <ArrowLeftStartOnRectangleIcon className="w-6" />
                                    Export Transactions
                                </a>
                                <Link href={route('transactions.dailyreportpage')} className=" w-full md:w-72 py-3 px-4 text-center bg-brownTheme tracking-wide text-white font-bold flex items-center justify-center gap-2 rounded-md hover:brightness-125 duration-150">
                                    <ArrowDownOnSquareIcon className="w-6" />
                                    Generate Daily Report
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


// {/* <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
//         <tr className="text-nowrap">
//             <TableHeading
//                 name="id"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-16"
//             >
//                 ID
//             </TableHeading>
//             <TableHeading
//                 name="created_at"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-28"
//             >
//                 Date
//             </TableHeading>
//             <th className="w-32 px-3 py-3">No Asset</th>
//             {/* <TableHeading
//                                                 name="name"
//                                                 sort_field={queryParams.sort_field}
//                                                 sort_direction={queryParams.sort_direction}
//                                                 sortChanged={sortChanged}
//                                                 className=" w-56 text-ellipsis"
//                                             >
//                                                 Nama Aset
//                                             </TableHeading> */}
//             <th className="w-56 text-ellipsis px-3">Nama Aset</th>
//             <TableHeading
//                 name="category_id"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-40 text-ellipsis"
//             >
//                 Category
//             </TableHeading>

//             <TableHeading
//                 name="condition"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-32 text-ellipsis"
//             >
//                 Kondisi
//             </TableHeading>

//             <TableHeading
//                 name="isDisposition"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-24 text-ellipsis"
//             >
//                 Lokasi
//             </TableHeading>
//             <TableHeading
//                 name="cost"
//                 sort_field={queryParams.sort_field}
//                 sort_direction={queryParams.sort_direction}
//                 sortChanged={sortChanged}
//                 className=" w-28 text-ellipsis"
//             >
//                 PIC
//             </TableHeading>
//             {/* <th className="px-3 py-3">Cost</th> */}
//             <th className="px-3 py-3 w-28 text-center">Created By</th>
//             {/* <th className="px-3 py-3 w-28 text-center">Updated By</th> */}
//             {
//                 auth.user.role === 'admin' && (
//                     <th className="px-3 py-3 w-24  text-center">Action</th>
//                 )
//             }
//         </tr>
//     </thead>
//     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
//         <tr className="text-nowrap">
//             <th className="px-3 py-3"></th>
//             <th className="px-3 py-3"></th>
//             <th className=" py-3 w-1">
// <TextInput
//     className="w-full"
//     defaultValue={queryParams.no_asset}
//     placeholder="no_asset"
//     onBlur={(e) =>
//         searchFieldChanged("no_asset", e.target.value)
//     }
//     onKeyPress={(e) => onKeyPress("no_asset", e)}
// />
//             </th>
//             <th className="px-3 py-3"></th>
//             <th className="py-3">
// <SelectInput
//     className="w-full"
//     defaultValue={queryParams.category_id}
//     onChange={(e) =>
//         searchFieldChanged("category_id", e.target.value)
//     }
// >
//     <option value="">Category</option>
//     <option value="1">Tooling</option>
//     <option value="2">Tooling2</option>
//     <option value="3">Tooling3</option>
//     <option value="4">Building</option>
//     <option value="5">Vehicle</option>
//     {/* <option value="6">Office Equipment</option> */}
// </SelectInput>
//             </th>
//             <th className="px-3 py-3"></th>
//             {/* <th className="px-3 py-3"></th> */}
//             <th className="px-3 py-3"></th>
//             <th className="px-3 py-3"></th>
//             <th className="px-3 py-3"></th>
//             {
//                 auth.user.role === 'admin' && (
//                     <th className="px-3 py-3"></th>
//                 )
//             }
//             {/* <th className="px-3 py-3"></th> */}
//         </tr>
//     </thead>
//     <tbody>
//         {transactions.data.map((transaction, index) => (
//             <tr
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                 key={transaction.id}
//             >
//                 <td className="px-3 py-2 text-center">{index + 1}</td>
//                 <td className="px-3 py-2 text-ellipsis overflow-hidden">{new Date(transaction.created_at).toLocaleDateString()}</td>
//                 <td className="px-3 py-2">{transaction.item_id.no_asset}</td>
//                 <td className="px-3 py-2">{transaction.item_id.name}</td>
//                 <td className="px-3 py-2 text-nowrap text-ellipsis overflow-hidden ">
//                     {transaction.item_id.category_id.name}
//                 </td>
//                 <td className="px-3 py-2 text-ellipsis overflow-hidden text-nowrap  ">
//                     {transaction.kondisi}
//                 </td>
//                 <td className="px-3 py-2 text-ellipsis overflow-hidden ">{transaction.lokasi}</td>
//                 <td className="px-3 py-2 text-ellipsis overflow-hidden ">{transaction.pic}</td>
//                 <td className="px-3 py-2 text-ellipsis overflow-hidden text-center">{transaction.user_id.name}</td>
//                 {/* <td className="px-3 py-2 text-ellipsis overflow-hidde text-center">{transaction.nbv}</td>
//                                                 <td className="px-3 py-2 text-ellipsis overflow-hidden text-center">{transaction.lokasi}</td> */}
// {
//     auth.user.role === 'admin' && (
//         <td className="px-3 py-2 overflow-hidden flex gap-2">
//             <Link href={route("transactions.edit", transaction)} className='bg-yellow-400 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
//                 {/* <Squares2X2Icon className='w-5 text-white' />   */}
//                 <PencilIcon className='w-5' />
//             </Link>
//             <button onClick={(e) => deleteTransaction(transaction)} className='bg-red-400 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
//                 {/* <Squares2X2Icon className='w-5 text-white' />   */}
//                 <XMarkIcon className='w-5' />
//             </button>
//         </td>
//     )
// }
//             </tr>
//         ))}
//     </tbody>
// </table> */}