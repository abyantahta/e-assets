import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
// import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import SelectInput from '@/Components/SelectInput'

const Show = ({ auth, item }) => {
    console.log(auth.user.id)
    let { id, no_asset, name, category_id, cost, isDisposition, lokasi, nbv, service_date } = item.data[0]
    const { data, setData, post, errors, reset } = useForm({
        item_id: id,
        // name: name,
        // category: category_id?.name,
        lokasi: lokasi,
        image_path: '',
        pic : '',
        kondisi : '',
        user_id: auth.user.id,
        // nbv: due_date,
    })
    const onSubmit = (e) => {
        console.log(data);
        e.preventDefault();

        console.log('submit')
        post(route('transactions.store'));
    }
    // console.log(auth)
    return (
        // <h1>hai</h1>
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        STO - {name}
                    </h2>
                    {/* <Link
                        href={route("transactions.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link> */}
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
                                    <InputLabel htmlFor="item_id" value="Nomor Asset" />
                                    <TextInput
                                        id="item_id"
                                        type="number"
                                        name="item_id"
                                        isFocused={true}
                                        value={id}
                                        disable = "true"
                                        className="mt-1 block w-full bg-gray-200 text-gray-500" />
                                    <InputError message={errors.item_id} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Nama Asset" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        isFocused={true}
                                        value={name}
                                        disable = "true"
                                        className="mt-1 block w-full bg-gray-200 text-gray-500" />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>
                                {/* <div className="mt-4">
                                    <InputLabel htmlFor="category" value="Kategori" />
                                    <TextInput
                                        id="category"
                                        type="text"
                                        name="category"
                                        isFocused={true}
                                        value={category_id?.name}
                                        disable = {true}
                                        className="mt-1 block w-full" />
                                    <InputError message={errors.category} className='mt-2' />
                                </div> */}
                                {/* <div className="mt-4">
                                    <InputLabel htmlFor="lokasi" value="Lokasi" />
                                    <TextInput
                                        id="lokasi"
                                        type="text"
                                        name="lokasi"
                                        isFocused={true}
                                        value={lokasi}
                                        disable = "true"
                                        className="mt-1 block w-full" />
                                    <InputError message={errors.lokasi} className='mt-2' />
                                </div> */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="lokasi" value="Lokasi" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setData("lokasi", e.target.value)
                                        }
                                    >
                                        <option value="">Select Lokasi</option>
                                        <option value="Taruma">Taruma</option>
                                        <option value="Dojo"> Dojo</option>
                                        <option value="Pos Satpam">Pos Satpam </option>
                                        <option value="Gedung Baru">Gedung Baru </option>
                                        <option value="Gedung Lama">Gedung Lama </option>
                                    </SelectInput>
                                    <InputError message={errors.lokasi} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="pic" value="pic" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setData("pic", e.target.value)
                                        }
                                    >
                                        <option value="">Select PIC</option>
                                        <option value="Pietra Shafira">Pietra Shafira</option>
                                        <option value="Abyan Tahta">Abyan Tahta</option>
                                        <option value="Firdaus Khoirifan">Firdaus Khoirifan</option>
                                        <option value="Amrullah Solikun">Amrullah Solikun</option>
                                    </SelectInput>
                                    <InputError message={errors.pic} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="kondisi" value="Kondisi" />
                                    <SelectInput
                                        className="w-full"
                                        onChange={(e) =>
                                            setData("kondisi", e.target.value)
                                        }
                                    >
                                        <option value="">Select Kondisi</option>
                                        <option value="baik">Baik</option>
                                        <option value="kureng">Kureng</option>
                                        <option value="rusak">Rusak</option>
                                    </SelectInput>
                                    {/* <TextInput 
                                    id="project_status" 
                                    type="text" 
                                    name="status" 
                                    isFocused = {true}
                                    value={data.status} 
                                    className="mt-1 block w-full" 
                                    onChange={e=> setData('status', 
                                    e.target.value)}/> */}
                                    <InputError message={errors.kondisi} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image_path"
                                        // value={data.image_path} 
                                        className="mt-1 block w-full"
                                        onChange={e => setData('image_path',
                                            e.target.files[0])} />
                                    <InputError message={errors.image_path} className='mt-2' />
                                </div>

                                {/* <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                                    <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        isFocused={true}
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('due_date',
                                            e.target.value)} />
                                    <InputError message={errors.due_date} className='mt-2' />
                                </div> */}
                                {/* <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput
                                        id="project_name"
                                        type="text"
                                        name="image"
                                        isFocused={true}
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('description',
                                            e.target.value)} />
                                    <InputError message={errors.description} className='mt-2' />
                                </div> */}
                                <div className="mt-4 text-right">
                                    <Link href={route("items.index")} className='bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm'>
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

export default Show






// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link } from "@inertiajs/react";
// // import TasksTable from "../Task/TasksTable";
// export default function Show({auth,item}) {
//     // dd()
//     console.log(item)
//     let {id, no_asset,name,category_id,cost,isDisposition,lokasi,nbv,service_date} = item.data[0]
//     return (
//         // <h1>hai</h1>
//         <AuthenticatedLayout
//             user={auth.user}
//             // header={
//             //     <div className="flex items-center justify-between">
//             //         <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//             //             {`Project "${project.name}"`}
//             //         </h2>
//             //         <Link
//             //             href={route("project.edit", project.id)}
//             //             className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
//             //         >
//             //             Edit
//             //         </Link>
//             //     </div>
//             // }
//         >
//             <Head title={`Project "${name}"`} />
//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//                         <h1>hlo</h1>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="pb-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             <TasksTable
//                                 tasks={tasks}
//                                 success={success}
//                                 queryParams={queryParams}
//                                 hideProjectColumn={true}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//         </AuthenticatedLayout>
//     );
// }