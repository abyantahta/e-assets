import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
// import CheckBadgeIcon from "@heroicons/react/16/solid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    MagnifyingGlassCircleIcon,
    Squares2X2Icon,
    ArrowPathIcon,
    CheckBadgeIcon,
    XCircleIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { Head, router, Link, useForm } from "@inertiajs/react";
import * as CryptoJS from "crypto-js";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Index({
    auth,
    items,
    queryParams = null,
    loadingParams = null,
    success,
    error,
}) {
    const [loadingSync, setLoadingSync] = useState(false);
    const [successInfo, setSuccessInfo] = useState(null);
    const [syncStatus, setSyncStatus] = useState();
    const [syncMessage, setSyncMessage] = useState();
    // console.log(items);
    useEffect(() => {
        setLoadingSync(false);
        if (success) {
            setSyncStatus(success.status);
            setSyncMessage(success.message);
        }
    }, [success]);
    const onSubmit = (e) => {
        e.preventDefault();
        setLoadingSync(true);
        loadingParams = loadingParams || {};
        loadingParams["loadingToggle"] = !successInfo?.toggle;
        router.post(route("syncqad"), loadingParams);
    };
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            queryParams["page"] = 1;
        } else {
            delete queryParams[name];
        }
        router.get(route("items.index"), queryParams);
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
        router.get(route("items.index"), queryParams);
    };
    const closeLoadingSync = () => {
        setSyncStatus(null);
        setSyncMessage(null);
        setSuccessInfo(null);
    };
    return (
        <>
            {loadingSync && (
                <div className="w-full h-lvh bg-[rgba(0,0,0,0.3)]  fixed top-0 left-0 z-[99999]"></div>
            )}
            {syncStatus && (
                <div className="w-full h-lvh bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 z-[99999]">
                    <div className="w-fit relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-60 flex flex-col items-center px-12 py-8 rounded-lg">
                        <div
                            onClick={closeLoadingSync}
                            className="cursor-pointer w-12 bg-white rounded-full text-red-500 absolute -top-4 -right-2"
                        >
                            <XCircleIcon className="" />
                        </div>
                        {syncStatus === "success" ? (
                            <>
                                <CheckBadgeIcon className="w-28 text-green-600" />
                                <h2 className="font-bold text-3xl">
                                    {syncMessage}
                                </h2>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className="w-28 text-red-400" />
                                <h2 className=" mt-2 font-bold text-3xl">
                                    {syncMessage}
                                </h2>
                            </>
                        )}
                    </div>
                </div>
            )}
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
                        SDI's Assets
                    </h1>
                    <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                        <div className="bg-lightTheme dark:bg-gray-800 overflow-hidden shadow-lg sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="flex flex-col-reverse gap-y-2 mb-4 md:flex-row md:justify-between">
                                    <div className="flex flex-col gap-y-2 w-full md:flex-row md:w-[40rem] gap-4">
                                        <SelectInput
                                            className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
                                            defaultValue={
                                                queryParams.category_id
                                            }
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Category</option>
                                            <option value="1">Tooling</option>
                                            <option value="2">Building</option>
                                            <option value="3">Vehicle</option>
                                            <option value="4">
                                                Office Equipment
                                            </option>
                                            <option value="5">Machine</option>
                                            {/* <option value="6">Office Equipment</option> */}
                                        </SelectInput>
                                        <SelectInput
                                            className="w-full border-gray-700 italic border-[3px] font-semibold focus:none ring:none text-greenTheme"
                                            defaultValue={
                                                queryParams.isDisposal
                                            }
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "isDisposal",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">All</option>
                                            <option value="1">Active</option>
                                            <option value="2">Deactive</option>
                                        </SelectInput>
                                        <form action="POST" onSubmit={onSubmit}>
                                            <button
                                                type="submit"
                                                className="bg-orangeTheme rounded-md text-white font-bold tracking-wider md:w-36 md:h-full px-2 flex items-center justify-center gap-1 hover:duration-150 hover:brightness-110 duration-150 w-full h-11"
                                            >
                                                Sync
                                                <ArrowPathIcon className="w-5 text-white" />
                                            </button>
                                        </form>
                                        <a
                                            href={`items/export/url`}
                                            className="w-full md:w-44 py-3 px-4 tracking-wide text-center bg-brownTheme font-bold flex items-center justify-center gap-2 text-white rounded-md hover:brightness-110 duration-150"
                                        >
                                            <ArrowLeftStartOnRectangleIcon className="w-6" />
                                            Barcode
                                        </a>
                                    </div>
                                    <TextInput
                                        className="w-full md:w-56 border-gray-700 border-[3px] placeholder:italic text-greenTheme font-normal focus:border-greenTheme focus:ring-greenTheme placeholder:text-greenTheme"
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
                                </div>
                                <div className="overflow-auto">
                                    <table className=" mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1">
                                        <thead className="sticky top-0 z-20 overflow-auto">
                                            <tr className="min-w-full flex text-center gap-3 !font-semibold">
                                                <th className="bg-white text-white w-12 h-11 flex items-center !font-semibold justify-center sticky pr-2 left-0 top-0 -mr-2">
                                                    <span className="w-9 h-11 bg-greenTheme rounded-md"></span>
                                                </th>
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
                                                {/* <th className='bg-greenTheme text-white w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                                <th className="sticky left-12 border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center">
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
                                                    name="service_date"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Service Date
                                                </TableHeading>

                                                <TableHeading
                                                    name="disposal_date"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Disposal
                                                </TableHeading>
                                                <TableHeading
                                                    name="cost"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                    className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                                >
                                                    Cost
                                                </TableHeading>
                                                {/* <th className="px-3 py-3">Cost</th> */}
                                                <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">
                                                    NBV
                                                </th>
                                                <th className="bg-greenTheme text-white w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">
                                                    Lokasi
                                                </th>
                                                {/* <th className='bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Nama Aset</th>
                                            <th className='bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Kategori</th>
                                            <th className='bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Service Date</th>
                                            <th className='bg-greenTheme text-white w-24 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Disposal</th>
                                            <th className='bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Cost</th>
                                            <th className='bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>NBV</th>
                                            <th className='bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Lokasi</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-auto box-border no-scrollbar">
                                            {items.data.map((item, index) => (
                                                <tr
                                                    className="min-w-full flex text-center gap-3 mt-3"
                                                    key={item.id}
                                                >
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } sticky -mr-2 left-0 top-0 h-11 py-2 text-ellipsis overflow-hidden text-nowrap flex items-center  w-12`}
                                                    >
                                                        <Link
                                                            href={route(
                                                                "items.show",
                                                                `${item.encrypted_no_asset}_${item.no_asset}`
                                                            )}
                                                            className={` ${item.isSTO? 'bg-greenTheme': item.disposal_date? 'bg-gray-400' : 'bg-red-400'} hover:brightness-110 duration-200 p-1 w-fit font-bold text-white rounded-[0.25rem] flex items-center justify-center`}
                                                        >
                                                            <Squares2X2Icon className="w-7 text-white" />
                                                        </Link>
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-16`}
                                                    >
                                                        {(items.meta.current_page-1)*items.meta.per_page+(index+1)}
                                                    </td>
                                                    <td
                                                        className={` overflow-visible sticky left-12 h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}
                                                    >
                                                        <span
                                                            className={`${
                                                                index % 2 != 0
                                                                    ? "bg-green-50"
                                                                    : "bg-white"
                                                            } border-greenTheme border-2 rounded-[0.25rem] w-full h-full inline-block px-3 py-2 `}
                                                        >
                                                            {item.no_asset}
                                                        </span>
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-52`}
                                                    >
                                                        {item.name}
                                                    </td>
                                                    <td
                                                        className={` ${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}
                                                    >
                                                        {item.category_id?.name}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}
                                                    >
                                                        {item.service_date
                                                            ? moment(
                                                                  item.service_date
                                                              ).format(
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : ""}
                                                        {/* {moment(item.service_date.format("DD/MM/YYYY"))} */}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-32`}
                                                    >
                                                        {item.disposal_date
                                                            ? moment(
                                                                  item.disposal_date
                                                              ).format(
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : ""}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}
                                                    >
                                                        Rp.{" "}
                                                        {Intl.NumberFormat(
                                                            "en-DE"
                                                        ).format(item.cost)}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}
                                                    >
                                                        Rp.{" "}
                                                        {Intl.NumberFormat(
                                                            "en-DE"
                                                        ).format(item.nbv)}
                                                    </td>
                                                    <td
                                                        className={`${
                                                            index % 2 != 0
                                                                ? "bg-green-50"
                                                                : "bg-white"
                                                        } px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-48`}
                                                    >
                                                        {item.lokasi}
                                                    </td>
                                                </tr>
                                            ))}
                                            {/* </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={items.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
