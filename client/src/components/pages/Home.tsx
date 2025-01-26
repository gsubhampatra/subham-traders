import ItemsTable from "../ui/tables/ItemsTable";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-4">
      <h1 className="text-6xl text-amber-800  font-bold">
        Welcome to Subham Traders
      </h1>
      <ItemsTable />
    </div>
  );
}

export default Home;
