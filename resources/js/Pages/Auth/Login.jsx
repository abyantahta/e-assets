import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <div className="-mt-6 w-full h-lvh flex items-center justify-center ">
                <div className="hidden">adsadasdas</div>
                <div className="relative">
                    <div className="relative  z-10 backdrop-blur-md flex flex-col items-center bg-white  bg-opacity-40 rounded-xl border-white border-2 backdrop:blur-xl py-12 min-w-96 px-8">
                        <div className="p-2 bg-white rounded-full mb-2">
                            <img src='https://media.licdn.com/dms/image/v2/D560BAQFAz4zMQsnRAQ/company-logo_200_200/company-logo_200_200/0/1683249151464?e=1741824000&v=beta&t=aQcfFvgQ4trOi8ep4w2eaNHdEsEdt1ur6XW__xP_kWo' className="h-16 w-16 fill-current text-gray-500" />
                        </div>
                        <h2 className='text-greenTheme text-4xl font-inter font-extrabold mb-6'>Login</h2>
                        <Head title="Log in" />
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        {/* <div className="bg-blue-400 inline-block w-full">dasdas</div> */}

                        <form className=' inline-block w-full' onSubmit={submit}>
                            <div className='flex gap-2 items-center px-3 mt-4 w-full rounded-md shadow-md bg-opacity-15 bg-[#F1B24A]'>
                                {/* <InputLabel htmlFor="email" value="Email" /> */}
                                <InputLabel htmlFor="email" value="">
                                    <EnvelopeIcon className='w-6 text-blackTheme' />
                                </InputLabel>

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="bg-transparent outline-none border-none"
                                    placeholder="email"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                            </div>
                                <InputError message={errors.email} className="mt-2" />

                            <div className=" flex gap-2 items-center px-3 mt-4 w-full rounded-md shadow-md bg-opacity-15 bg-[#F1B24A]">
                                <InputLabel htmlFor="password" value="">
                                    <KeyIcon className='w-6 text-blackTheme' />
                                </InputLabel>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={data.password}
                                    className=" outline-none border-none bg-transparent focus:outline-none"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                            </div>
                                <InputError message={errors.password} className="mt-2" />

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                            <PrimaryButton className=" mt-2 w-full text-center bg-greenTheme" disabled={processing}>
                                Login
                            </PrimaryButton>
                        </form>

                    </div>
                    <div className="w-20 h-20 bg-gradient-to-tr from-greenTheme to-green-200 rounded-full absolute -top-3 -left-5 animate-loginGreen"></div>
                    <div className="w-20 h-20 bg-gradient-to-tr from-redTheme to-red-200 rounded-full absolute -bottom-2 -right-7 animate-loginRed"></div>
                    {/* <div className="w-20 h-20 bg-gradient-to-tr from-redTheme to-red-200 rounded-full absolute top-12 left-28"></div> */}
                </div>
            </div>
        </GuestLayout>
    );
}
