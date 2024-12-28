import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
// import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import SelectInput from '@/Components/SelectInput'

const DailyReport = () => {
    const [PIC, setPIC] = useState('')
    const [divisionInCharge, setdivisionInCharge] = useState('')
    const [kategori, setKategori] = useState('')
    let users = [
        "Pietra Shafira",
        "Amrullah",
        "Muhammad Khoirifan",
    ]
    const onSubmit = (e) => {
        e.preventDefault();
        let queryParams = {
            "PIC": PIC,
            "divisionInCharge": divisionInCharge,
            "kategori": kategori
        }
        router.get(route("transactions.dailyreport"), queryParams)
    }
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
                            <form onSubmit={onSubmit} action="" className='p-4 sm:p-8 bg-lightTheme dark:bg-gray-800 shadow sm:rounded-lg '>
                                <div className="mt-4">
                                    <InputLabel htmlFor="divisionInCharge" value="Division in Charge" />
                                    <SelectInput
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) =>
                                            setdivisionInCharge(e.target.value)
                                        }
                                    >
                                        <option value="">Select Division in Charge Head</option>
                                        {
                                            users.map(user => (
                                                <option key={user} value={user}>{user}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    {/* <InputError className='mt-2' /> */}
                                </div>


                                <div className="mt-4">
                                    <InputLabel htmlFor="pic" value="PIC" />
                                    <SelectInput
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) =>
                                            setPIC(e.target.value)
                                        }
                                    >
                                        <option value="PIC">Select PIC</option>
                                        {
                                            users.map(user => (
                                                <option key={user} value={user}>{user}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    {/* <InputError message={errors.pic} className='mt-2' /> */}
                                </div>
                                <div className="mt-4 w-full">
                                    <InputLabel htmlFor="kategori" value="Kategori" />
                                    <SelectInput
                                        className="w-full outline-none cursor-pointer border-none bg-[#FFFEF5] shadow-[-3px_4px_14px_-5px_rgba(0,_0,_0,_0.1)] text-xl  !text-greenTheme  h-12"
                                        onChange={(e) =>
                                            setKategori(e.target.value)
                                        }
                                    >
                                        <option value="">Select Kategori</option>
                                        <option value="Tooling">Tooling</option>
                                        <option value="Tooling2"> Tooling2</option>
                                        <option value="Tooling3">Tooling3 </option>
                                        <option value="Building">Building</option>
                                        <option value="Vehicle">Vehicle </option>
                                        <option value="Office Equipment">Office Equipment</option>
                                    </SelectInput>
                                    {/* <InputError message={errors.kategori} className='mt-2' /> */}
                                </div>

                                <div className="mt-8 text-center flex flex-col-reverse md:flex-row gap-x-4 gap-y-3 justify-center ">
                                    <Link href={route("transactions.index")} className='bg-gray-100 py-3 px-20 font-semibold text-greenTheme rounded shadow transition-all hover:bg-gray-200text-md'>
                                        Cancel
                                    </Link>
                                    <button type='submit' className='bg-orangeTheme font-semibold py-3 text-md px-20 text-white rounded shadow transition-all hover:brightness-110'>
                                        Generate
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default DailyReport



