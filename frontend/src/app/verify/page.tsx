
import Footer from "@/components/footer";
import VerifyEmail from "@/components/verifyEmail";



export default function Verify() {

  return (
    <div className="relative text-white px-6 pt-6 pb-3 gap-4 flex min-h-screen flex-col w-full justify-center
     items-center bg-gradient-to-r bg-zinc-900 md:h-screen">

      <main className="flex w-full h-full  items-center justify-center
       rounded-lg border-white sm:border-4 sm:border-dashed">

        <VerifyEmail/>

      </main>

      <Footer/>

    </div>
  );
}