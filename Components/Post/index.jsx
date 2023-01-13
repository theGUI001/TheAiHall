import Image from "next/image";

export default function Post({ prompt, image, author }) {
    let promptN = prompt
    if (promptN.length > 60) {
        promptN = promptN.substring(0, 60) + '...';
    }
    return (
        <div className=" bg-gray-900 h-full w-72 rounded-xl px-2">
            <div id="img" className="flex justify-center">
                <Image
                    src={`https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/gr76az1mgnha/b/bucket-aihall/o/${image}`}
                    alt={prompt}
                    height={256}
                    width={256}
                    className="rounded-2xl p-2 mt-4 mb-1"
                />
            </div>
            <h1 className="text-gray-300 text-center mb-1">{`"${promptN}"`}</h1>
            <h1 className="text-white text-center pb-4"><span>by: </span>{author}</h1>
        </div>
    )
}