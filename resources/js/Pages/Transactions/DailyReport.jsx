import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
// import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";

const DailyReport = ({users, categories}) => {
    // const {users} = props[0]
    // console.log(users)
    // dd('users');
    const [PIC, setPIC] = useState(0);
    const [divisionInCharge, setdivisionInCharge] = useState(0);
    const [kategori, setKategori] = useState("");
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    // let users = ["Pietra Shafira", "Amrullah", "Muhammad Khoirifan"];
    const onSubmit = (e) => {
        e.preventDefault();
        router.get(route("transactions.dailyreport"), queryParams);
    };
    const queryParamsExport = () => {
        let string = "?";
        if (PIC)
            string += `&PIC=${PIC}`;
        if (divisionInCharge)
            string += `&divisionInCharge=${divisionInCharge}`;
        if (kategori)
            string += `&kategori=${kategori}`;        
        if (date)
            string += `&date=${date}`;
        return string;
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Generate Daily Report
                    </h2>
                </div>
            }
        >
            <Head title="STO FORM" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-lightTheme dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                action=""
                                className="p-4 sm:p-8 bg-lightTheme dark:bg-gray-800 shadow sm:rounded-lg "
                            >
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="divisionInCharge"
                                        value="Division in Charge"
                                    />
                                    <SelectInput
                                        required
                                    	id = "divisionInCharge"
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) =>
                                            setdivisionInCharge(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Division in Charge Head
                                        </option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    {/* <InputError className='mt-2' /> */}
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="pic" value="PIC" />
                                    <SelectInput
                                        required
                                    	id = "pic"
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) => setPIC(e.target.value)}
                                    >
                                        <option value="PIC">Select PIC</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    {/* <InputError message={errors.pic} className='mt-2' /> */}
                                </div>
                                <div className="mt-4 w-full">
                                    <InputLabel
                                        htmlFor="kategori"
                                        value="Kategori"
                                    />
                                    <SelectInput
                                        required
                                    	id = "kategori"
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) =>
                                            setKategori(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Kategori
                                        </option>

                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    {/* <InputError message={errors.kategori} className='mt-2' /> */}
                                </div>
                                <div className="mt-4 w-full">
                                    <InputLabel
                                        htmlFor="date"
                                        value="Date"
                                    />
                                    <input
                                        required
                                    	id = "date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        type="date"
                                        className="w-52 outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                    />
                                    {/* <InputError message={errors.kategori} className='mt-2' /> */}
                                </div>

                                <div className="mt-8 text-center flex flex-col-reverse md:flex-row gap-x-4 gap-y-3 justify-center ">
                                    <Link
                                        href={route("transactions.index")}
                                        className="bg-gray-100 py-3 px-20 font-semibold text-greenTheme rounded shadow transition-all hover:bg-gray-200text-md"
                                    >
                                        Cancel
                                    </Link>
                                    {/* <button type='submit' className='bg-orangeTheme font-semibold py-3 text-md px-20 text-white rounded shadow transition-all hover:brightness-110'>
                                        Generate
                                    </button> */}
                                    <a
                                        href={`/transactions/dailyreport${queryParamsExport()}`}
                                        className="w-full md:w-72  py-3 px-4 tracking-wide text-center bg-orangeTheme font-bold flex items-center justify-center gap-2 text-white rounded-md hover:brightness-110 duration-150"
                                    >
                                        <ArrowLeftStartOnRectangleIcon className="w-6" />
                                        Generate
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DailyReport;
