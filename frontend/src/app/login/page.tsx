

import Footer from "@/components/footer";
import LoginForm from "@/components/loginForm";

export default function Login() {

  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 flex min-h-screen flex-col w-full justify-center
         items-center bg-zinc-900 md:h-screen">

      <main className="flex w-full h-full  items-center justify-center
         rounded-lg border-white sm:border-4 sm:border-dashed">

        <LoginForm />

      </main>

      <Footer />

    </div>
  );
}
