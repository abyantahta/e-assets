import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
// import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import SelectInput from '@/Components/SelectInput'

const Edit = ({ auth, transaction }) => {
    console.log(transaction.data)
    let { id,image_path,kondisi,lokasi,pic, created_at } = transaction.data
    let { no_asset, name } = transaction.data.item_id
    let user = transaction.data.user_id.name
    // let { no_asset, name } = transaction.data.item_id
    const { data, setData, post, errors, reset } = useForm({
        item_id: id || "",
        // name: name || "",
        // category: transaction.data.item_id.category_id.id || "",
        image_path: "",
        lokasi: lokasi || "",
        kondisi : kondisi || "",
        pic : pic || "",
        user_id: transaction.data.user_id.id || "",
        _method : "PUT"
        // nbv: due_date,
    })
    const onSubmit = (e) => {
        console.log(data);
        e.preventDefault();

        console.log('submit')
        post(route('transactions.update', id));
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
                                        type="text"
                                        name="item_id"
                                        isFocused={true}
                                        defaultValue={no_asset}
                                        // disabled
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
                                        disable = 'true'
                                        className="mt-1 block w-full bg-gray-200 text-gray-500" />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="lokasi" value="Lokasi" />
                                    <SelectInput
                                        className="w-full"
                                        defaultValue = {data.lokasi}
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
                                    <InputLabel htmlFor="pic" value="PIC" />
                                    <SelectInput
                                        className="w-full"
                                        defaultValue = {data.pic}
                                        onChange={(e) =>
                                            setData("pic", e.target.value)
                                        }
                                    >
                                        <option value="">Select PIC</option>
                                        <option value="Pietra Shafira">Pietra Shafira</option>
                                        <option value="Abyan Tahta">Abyan Tahta</option>
                                        <option value="Firdaus Khorifan">Firdaus Khoirifan</option>
                                        <option value="Amrullah Solikun">Amrullah Solikun</option>
                                    </SelectInput>
                                    <InputError message={errors.pic} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="kondisi" value="Kondisi" />
                                    <SelectInput
                                        className="w-full"
                                        defaultValue = {data.kondisi}
                                        onChange={(e) =>
                                            setData("kondisi", e.target.value)
                                        }
                                    >
                                        <option value="">Select Kondisi</option>
                                        <option value="baik">Baik</option>
                                        <option value="kureng">Kureng</option>
                                        <option value="rusak">Rusak</option>
                                    </SelectInput>
                                    <InputError message={errors.kondisi} className='mt-2' />
                                </div>
                                {image_path && (
                                    <div className="mb-4 mt-4 rounded-md overflow-hidden">
                                        <img src={image_path} className="h-60" />
                                    </div>
                                )}
                                <div className="mt-4">
                                    <InputLabel htmlFor="image_path" value="Image" />
                                    <TextInput
                                        id="image_path"
                                        type="file"
                                        name="image_path"
                                        defaultValue={data.image_path} 
                                        className="mt-1 block w-full"
                                        onChange={e => setData('image_path',
                                            e.target.files[0])} />
                                    <InputError message={errors.image_path} className='mt-2' />
                                </div>
                                <div className="mt-4">
                                    <h2 className='font-bold'>STO by {user}
                                        at {new Date(created_at).toLocaleDateString()}
                                    </h2>
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

export default Edit
