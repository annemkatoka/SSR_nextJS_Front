import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';




const Layout = ({children}) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Home | Facturación</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />  
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
                <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>


            </Head>


            {router.pathname === '/login' ? (
                <div className="bg-gray-800 min-h-screen">
                    {children}
                </div>
            ):(
                <div>

                <div className="bg-gray-500 min-h-screen">            
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="sm:w-full xl:w-5/6 sm:min-h-screen p-5">
                            {children}
                        </main>
                    </div>
                </div>
                </div>
            )}



        </>
    );
}

export default Layout;