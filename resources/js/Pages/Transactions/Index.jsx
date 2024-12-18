import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowDownOnSquareIcon, ArrowLeftStartOnRectangleIcon, PencilIcon, PlusIcon, XMarkIcon, } from '@heroicons/react/16/solid';
import { Head, router, Link } from '@inertiajs/react';
import * as CryptoJS from 'crypto-js';

export default function Index({ auth, transactions, queryParams = null, success }) {
    // console.log(auth.user.role);
    console.log(transactions)
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("transactions.index"), queryParams);
    };

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
    // console.log(items)
    console.log(transactions);
    return (
        // <h1>halo</h1>
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Items Page
                </h2>
            }
        >
            <Head title="Item" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex w-fit gap-6 ml-auto mt-6 mr-6">
                            <a href='transactions/fullsto' className="ml-auto  py-1 w-fit px-4 text-center bg-yellow-400 font-bold flex items-center justify-center gap-2 text-gray-600 rounded-md">
                                <ArrowLeftStartOnRectangleIcon className="w-6" />
                                Export Transactions
                            </a>
                            <Link className="ml-auto  py-1 w-fit px-4 text-center bg-blue-400 text-white font-bold flex items-center justify-center gap-2 rounded-md">
                                <ArrowDownOnSquareIcon className="w-6" />
                                Generate Daily Report
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-16"
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-28"
                                            >
                                                Date
                                            </TableHeading>
                                            <th className="w-32 px-3 py-3">No Asset</th>
                                            {/* <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-56 text-ellipsis"
                                            >
                                                Nama Aset
                                            </TableHeading> */}
                                            <th className="w-56 text-ellipsis px-3">Nama Aset</th>
                                            <TableHeading
                                                name="category_id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-40 text-ellipsis"
                                            >
                                                Category
                                            </TableHeading>

                                            <TableHeading
                                                name="condition"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-32 text-ellipsis"
                                            >
                                                Kondisi
                                            </TableHeading>

                                            <TableHeading
                                                name="isDisposition"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-24 text-ellipsis"
                                            >
                                                Lokasi
                                            </TableHeading>
                                            <TableHeading
                                                name="cost"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" w-28 text-ellipsis"
                                            >
                                                PIC
                                            </TableHeading>
                                            {/* <th className="px-3 py-3">Cost</th> */}
                                            <th className="px-3 py-3 w-28 text-center">Created By</th>
                                            {/* <th className="px-3 py-3 w-28 text-center">Updated By</th> */}
                                            {
                                                auth.user.role === 'admin' && (
                                                    <th className="px-3 py-3 w-24  text-center">Action</th>
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className=" py-3 w-1">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.no_asset}
                                                    placeholder="no_asset"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("no_asset", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("no_asset", e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="py-3">
                                                <SelectInput
                                                    className="w-full"
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
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            {/* <th className="px-3 py-3"></th> */}
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            {
                                                auth.user.role === 'admin' && (
                                                    <th className="px-3 py-3"></th>
                                                )
                                            }
                                            {/* <th className="px-3 py-3"></th> */}
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
                                                <td className="px-3 py-2">{transaction.item_id.no_asset}</td>
                                                <td className="px-3 py-2">{transaction.item_id.name}</td>
                                                <td className="px-3 py-2 text-nowrap text-ellipsis overflow-hidden ">
                                                    {transaction.item_id.category_id.name}
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
                                                            <Link href={route("transactions.edit", transaction)} className='bg-yellow-400 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center'>
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
                            </div>
                            <Pagination links={transactions.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
