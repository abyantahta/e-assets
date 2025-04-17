import DatePicker from "@/Components/DatePicker";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ArrowDownOnSquareIcon,
    ArrowLeftStartOnRectangleIcon,
    PencilIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { Head, router, Link } from "@inertiajs/react";
import moment from "moment";

export default function Index({
    auth,
    transactions,
    queryParams = null,
    success,
    locations,
    categories,
    periode_sto
}) {
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
    };
    const deleteTransaction = (transaction) => {
        if (
            !window.confirm("Are you sure you want to delete the transaction?")
        ) {
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
        if (queryParams["category_id"])
            string += `&category_id=${queryParams["category_id"]}`;
        if (queryParams["dateStart"])
            string += `&dateStart=${queryParams["dateStart"]}`;
        if (queryParams["dateEnd"])
            string += `&dateEnd=${queryParams["dateEnd"]}`;
        return string;
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
                <h1 className="text-5xl text-center font-semibold font-playfairDisplay text-greenTheme tracking-wider">
                    STO History
                </h1>
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-lightTheme dark:bg-gray-800 shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex flex-col gap-y-2 lg:flex-row-reverse justify-between">
                                <TextInput
                                    className="w-full lg:w-56 border-gray-700 border-[3px] placeholder:italic text-greenTheme font-normal focus:border-greenTheme focus:ring-greenTheme placeholder:text-greenTheme"
                                    defaultValue={queryParams.no_asset}
                                    placeholder="Search by no asset"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "no_asset",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("no_asset", e)
                                    }
                                />
                                <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2">
                                    <SelectInput
                                        className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-52"
                                        defaultValue={queryParams.category_id}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Category</option>
                                        {
                                            
                                            categories.map(category=>(
                                                <option key={category.name} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <DatePicker
                                        searchFieldChanged={searchFieldChanged}
                                        queryParams={queryParams}   
                                    />
                                    <SelectInput
                                        className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-52"
                                        defaultValue={queryParams.location_id}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "location_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Location</option>
                                        {
                                            locations.map(location=>(
                                                <option key={location.location_name} value={location.id}>{location.location_name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <SelectInput
                                        className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme lg:w-52"
                                        defaultValue={queryParams.periode_sto}
                                        onChange={(e) =>
                                            searchFieldChanged(
                                                "periode_sto",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Periode STO</option>
                                        {
                                            periode_sto.data.map(item=>(
                                                <option key={item.cutoff_counter} value={item.cutoff_counter}>{item.start_period} - {item.end_period}</option>
                                            ))
                                        }
                                    </SelectInput>
                                </div>
                            </div>
                            <div className="overflow-auto">
                                <table className=" mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1">
                                    <thead className=" overflow-auto">
                                        <tr className="min-w-full flex text-center gap-3 !font-semibold">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-44 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Date
                                            </TableHeading>
                                            {/* <th className='bg-greenTheme text-white w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                            <th className=" border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center">
                                                <span className="bg-greenTheme  w-full h-11 flex items-center justify-center rounded-[0.25rem]">
                                                    No Asset
                                                </span>
                                            </th>
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Nama Aset
                                            </TableHeading>
                                            <TableHeading
                                                name="category_id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Category
                                            </TableHeading>
                                            <TableHeading
                                                name="kondisi"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Kondisi
                                            </TableHeading>
                                            <TableHeading
                                                name="lokasi"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Lokasi
                                            </TableHeading>
                                            <TableHeading
                                                name="pic"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                PIC
                                            </TableHeading>
                                            <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">
                                                Created By
                                            </th>
                                            {
                                                auth.user.role_id ===
                                                2 &&(
                                                <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">
                                                    Aksi
                                                </th>
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-auto box-border no-scrollbar">
                                        {transactions.data.map(
                                            (transaction, index) => (
                                                <tr
                                                    className="min-w-full flex text-center gap-3 mt-3"
                                                    key={transaction.id}
                                                >
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-16`}
                                                    >
                                                        {(transactions.meta
                                                            .current_page -
                                                            1) *
                                                            transactions.meta
                                                                .per_page +
                                                            (index + 1)}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-44`}
                                                    >
                                                        {moment(
                                                            transaction.created_at
                                                        ).format(
                                                            "DD/MM/YYYY - hh:mm"
                                                        )}
                                                    </td>
                                                    <td
                                                        className={` overflow-visible  h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}
                                                    >
                                                        <span
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-50"
                                                                    : "bg-white"
                                                            } border-greenTheme border-2 rounded-[0.25rem] w-full h-full inline-block px-3 py-2 `}
                                                        >
                                                            {
                                                                transaction
                                                                    .item_id
                                                                    ?.no_asset
                                                            }
                                                        </span>
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-52`}
                                                    >
                                                        {" "}
                                                        {
                                                            transaction.item_id
                                                                .name
                                                        }{" "}
                                                    </td>
                                                    <td
                                                        className={` ${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}
                                                    >
                                                        {" "}
                                                        {
                                                            transaction.item_id
                                                                .category_id
                                                                ?.name
                                                        }{" "}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}
                                                    >
                                                        {transaction.kondisi}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-32`}
                                                    >
                                                        {transaction.location_id.location_name}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}
                                                    >
                                                        {transaction.pic?.name}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}
                                                    >
                                                        {
                                                            transaction
                                                                .created_by.name
                                                        }
                                                    </td>
                                                    {auth.user.role_id ===
                                                        2 && (
                                                        <td
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-50"
                                                                    : "bg-white"
                                                            } px-6 flex h-11 py-1 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}
                                                        >
                                                            {transaction.isEditable ? (
                                                                <>
                                                                    <Link
                                                                        href={route(
                                                                            "transactions.edit",
                                                                            transaction
                                                                        )}
                                                                        className="bg-yellow-500 hover:brightness-110 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center"
                                                                    >
                                                                        <PencilIcon className="w-5" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            deleteTransaction(
                                                                                transaction
                                                                            )
                                                                        }
                                                                        className="bg-red-400 hover:brightness-125 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center"
                                                                    >
                                                                        <XMarkIcon className="w-5" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                <div className="bg-gray-400 hover:brightness-110 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center">
                                                                    <PencilIcon className="w-5" />
                                                                </div>
                                                                <div
                                                                        className="bg-gray-400 hover:brightness-125 duration-150 p-2 mx-auto w-fit font-bold text-white rounded-md flex items-center justify-center"
                                                                    >
                                                                        <XMarkIcon className="w-5" />
                                                                    </div>

                                                                </>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            )
                                        )}
                                        {/* </tr> */}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={transactions.meta.links} />
                            <div className="flex-col md:flex-row flex gap-4 md:w-fit ml-auto mt-6 mr-6  w-full">
                                <a
                                    href={`transactions/fullsto${queryParamsExport()}`}
                                    className="w-full md:w-72  py-3 px-4 tracking-wide text-center bg-orangeTheme font-bold flex items-center justify-center gap-2 text-white rounded-md hover:brightness-110 duration-150"
                                >
                                    <ArrowLeftStartOnRectangleIcon className="w-6" />
                                    Export Transactions
                                </a>
                                <Link
                                    href={route("transactions.dailyreportpage")}
                                    className=" w-full md:w-72 py-3 px-4 text-center bg-brownTheme tracking-wide text-white font-bold flex items-center justify-center gap-2 rounded-md hover:brightness-125 duration-150"
                                >
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
