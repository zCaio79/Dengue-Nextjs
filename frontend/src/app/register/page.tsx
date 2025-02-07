
import Footer from "@/components/footer";
import RegisterForm from "@/components/registerForm";


export default function Register() {

  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 flex min-h-screen flex-col w-full justify-center
     items-center bg-gradient-to-r from-red-500 via-orange-500 to-red-500 md:h-screen">

      <main className="flex w-full h-full  items-center justify-center
       rounded-lg border-white border-4 border-dashed">

        <RegisterForm/>

      </main>

      <Footer/>

    </div>
  );
}
