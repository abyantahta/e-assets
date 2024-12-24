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
    const [stoAdmin, setstoAdmin] = useState('')
    // let queryParams
    // queryParams = {};
    let users = [
            "Pietra Shafira",
            "Amrullah",
            "Muhammad Khoirifan",
    ]
    // console.log(auth.user.id)
    // let { id, no_asset, name, category_id, cost, isDisposition, lokasi, nbv, service_date } = item.data[0]
    const onSubmit = (e) => {
        console.log(PIC, divisionInCharge, stoAdmin);
        e.preventDefault();
        let queryParams = {
            "PIC" : PIC,
            "divisionInCharge" : divisionInCharge,
            "stoAdmin" : stoAdmin
        }
        console.log('submit')
        router.get(route("transactions.dailyreport"), queryParams)
        // post(route('transactions.store'));
    }
    // console.log(auth)
    return (
        // <h1>hai</h1>
        <AuthenticatedLayout
            // user={auth.user}
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
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} action="" className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg '>
                                <div className="mt-4">
                                    <InputLabel htmlFor="divisionInCharge" value="Division in Charge" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setdivisionInCharge(e.target.value)
                                        }
                                    >
                                        <option value="">Select Division in Charge Head</option>
                                        {
                                            users.map(user=>(
                                                <option key={user} value={user}>{user}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    {/* <InputError className='mt-2' /> */}
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="stoadmin" value="STO Admin" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setstoAdmin(e.target.value)
                                        }
                                    >
                                        <option value="">Select STO Admin</option>
                                        {
                                            users.map(user=>(
                                                <option key={user} value={user}>{user}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    {/* <InputError message={errors.stoadmin} className='mt-2' /> */}
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="pic" value="PIC" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setPIC(e.target.value)
                                        }
                                    >
                                        <option value="PIC">Select PIC</option>
                                        {
                                            users.map(user=>(
                                                <option key={user} value={user}>{user}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    {/* <InputError message={errors.pic} className='mt-2' /> */}
                                </div>

                                <div className="mt-4 text-right">
                                    <Link href={route("transactions.index")} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm'>
                                        Cancel
                                    </Link>
                                    <button type='submit' className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm'>
                                        Submit
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





