import ListaSeries from "@/components/ListaSeries";
import NuevoSerie from "@/components/NuevoSerie";

function NewPage() {
  return (
    <div className="flex justify-center items-center h-full ">
      <NuevoSerie />
      <ListaSeries />
    </div>
  );
}

export default NewPage;
