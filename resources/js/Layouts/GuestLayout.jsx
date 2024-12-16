import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white sm:pt-0 dark:bg-gray-900 w-lvw overflow-hidden">
            {/* <div className=''> */}
                {/* <Link href="/"> */}
                {/* </Link> */}
            {/* </div> */}


            {/* <div className="bg-blue-400 max-w-96 py-24 px-12 min-h-96 "> */}
                {children}
            {/* </div> */}
        </div>
    );
}
