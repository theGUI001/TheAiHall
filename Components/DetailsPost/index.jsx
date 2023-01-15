import Image from 'next/image'
import Link from 'next/link'

export default function DetailsPost({ data }) {

    const { prompt, author, url } = data

    return (
        <div className="h-screen flex items-center justify-center" id='uPost'>
            <div className="px-7 flex flex-col py-6 shadow w-[94vw] h-[90vh] bg-gray-900 rounded-md items-center md:flex-row gap-2  md:justify-between ">
                <div className='relative aspect-square rounded-lg w-full h-auto md:w-full md:h-auto md:max-h-full md:max-w-[50%]'>
                    <Image
                        src={`https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/gr76az1mgnha/b/bucket-aihall/o/${url}`}
                        alt={prompt}
                        fill
                        className='object-contain rounded-lg'
                    />
                </div>

                <div className='flex flex-col justify-center my-auto items-center w-full h-auto md:w-1/2'>
                    <h1 className='text-center text-white capitalize 2xl:text-2xl'>&quot;{prompt}&quot;</h1>
                    <h1 className='text-center text-gray-400 capitalize 2xl:text-2xl'>By: {author}</h1>
                </div>
                <div className='md:hidden'>
                    <Link href='/'>
                        <span className='text-center text-gray-500'>Back to Home</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}