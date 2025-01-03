import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MagnifyingGlassCircleIcon, Squares2X2Icon } from '@heroicons/react/16/solid';
import { Head, router, Link } from '@inertiajs/react';
import * as CryptoJS from 'crypto-js';
import moment from 'moment';

export default function Index({ auth, items, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            queryParams['page'] =1;
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
                <h1 className='text-5xl text-center font-semibold font-playfairDisplay text-greenTheme tracking-wider'>SDI's Assets</h1>
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-lightTheme dark:bg-gray-800 overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col-reverse gap-y-2 mb-4 md:flex-row md:justify-between">
                                <div className="flex flex-col gap-y-2 w-full md:flex-row md:w-96 gap-4">
                                    <SelectInput
                                        className="w-full border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
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
                                    <SelectInput
                                        className="w-full border-gray-700 italic border-[3px] font-semibold focus:none ring:none text-greenTheme"
                                        defaultValue={queryParams.isDisposal}
                                        onChange={(e) =>
                                            searchFieldChanged("isDisposal", e.target.value)
                                        }
                                    >
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="2">Deactive</option>
                                    </SelectInput>
                                </div>
                                <TextInput
                                    className="w-full md:w-56 border-gray-700 border-[3px] placeholder:italic text-greenTheme font-normal focus:border-greenTheme focus:ring-greenTheme placeholder:text-greenTheme"
                                    defaultValue={queryParams.no_asset}
                                    placeholder="Search by no asset"
                                    onBlur={(e) =>
                                        searchFieldChanged("no_asset", e.target.value)
                                    }
                                    onKeyPress={(e) => onKeyPress("no_asset", e)}

                                />
                            </div>
                            <div className="overflow-auto">
                                <table className=' mb-4 min-w-full table-fixed z-10 h-full border-collapse border-spacing-2 gap-1'>
                                    <thead className='sticky top-0 z-20 overflow-auto'>
                                        <tr className='min-w-full flex text-center gap-3 !font-semibold'>
                                            <th className='bg-white text-white w-12 h-11 flex items-center !font-semibold justify-center sticky pr-2 left-0 top-0 -mr-2'>
                                                <span className='w-9 h-11 bg-greenTheme rounded-md'>

                                                </span>
                                            </th>
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-16 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                No
                                            </TableHeading>
                                            {/* <th className='bg-greenTheme text-white w-12 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>No</th> */}
                                            <th className='sticky left-12 border-r-[10px] border-r-lightTheme text-white w-40 -mr-3 h-11 flex items-center !font-semibold justify-center'>
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
                                                name="service_date"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Service Date
                                            </TableHeading>

                                            <TableHeading
                                                name="isDisposition"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Disposal
                                            </TableHeading>
                                            <TableHeading
                                                name="cost"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                className=" bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center"
                                            >
                                                Cost
                                            </TableHeading>
                                            {/* <th className="px-3 py-3">Cost</th> */}
                                            <th className="bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">NBV</th>
                                            <th className="bg-greenTheme text-white w-48 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center">Lokasi</th>
                                            {/* <th className='bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Nama Aset</th>
                                            <th className='bg-greenTheme text-white w-36 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Kategori</th>
                                            <th className='bg-greenTheme text-white w-32 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Service Date</th>
                                            <th className='bg-greenTheme text-white w-24 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Disposal</th>
                                            <th className='bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Cost</th>
                                            <th className='bg-greenTheme text-white w-40 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>NBV</th>
                                            <th className='bg-greenTheme text-white w-52 rounded-[0.25rem] h-11 flex items-center !font-semibold justify-center'>Lokasi</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-auto box-border no-scrollbar'>
                                        {items.data.map((item, index) => (
                                            <tr
                                                className="min-w-full flex text-center gap-3 mt-3"
                                                key={item.id}
                                            >
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} sticky -mr-2 left-0 top-0 h-11 py-2 text-ellipsis overflow-hidden text-nowrap flex items-center  w-12`}>
                                                    <Link href={route("items.show", item.id)} className='bg-orangeTheme hover:brightness-110 duration-200 p-1 w-fit font-bold text-white rounded-[0.25rem] flex items-center justify-center'>
                                                        <Squares2X2Icon className='w-7 text-white' />
                                                    </Link>
                                                </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-1 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-16`}>{item.id}</td>
                                                <td className={` overflow-visible sticky left-12 h-11 -mr-3 bg-lightTheme text-ellipsis text-nowrap text-center pr-3 w-40`}>
                                                    <span className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} border-greenTheme border-2 rounded-[0.25rem] w-full h-full inline-block px-3 py-2 `}>{item.no_asset}</span>
                                                </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-52`}>
                                                    {item.name}
                                                </td>
                                                <td className={` ${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}>
                                                    {item.category_id?.name}
                                                </td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-40`}>{moment(item.service_date).format('DD/MM/YYYY')}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-32`}>{item.isDisposition ? "Yes" : "No"}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{item.cost}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-36`}>{item.nbv}</td>
                                                <td className={`${index % 2 != 0 ? "bg-green-50" : "bg-white"} px-3 h-11 py-2 text-ellipsis overflow-hidden text-nowrap text-center border-greenTheme border-2 rounded-[0.25rem] w-48`}>{item.lokasi}</td>
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
    );
}
