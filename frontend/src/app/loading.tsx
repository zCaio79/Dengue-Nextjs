import Image from "next/image";

export default function Loading() {
    return (
        <div className="absolute flex w-screen h-screen justify-center items-center bg-white">

            <Image unoptimized src="/loading.svg" alt="loading" width={500} height={500} />

        </div>
    )
}