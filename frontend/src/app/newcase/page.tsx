import Footer from "@/components/footer";
import NewcaseForm from "@/components/newcaseForm";


export default function NewCase() {

  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 flex min-h-screen flex-col w-full justify-center
    items-center bg-zinc-900 md:h-screen">

        <main className="flex relative min-h-[70vh] w-full h-full items-center justify-center
        rounded-lg border-white border-4 border-dashed">
            <NewcaseForm/>
        </main>

      <Footer />

    </div>
  );
}
