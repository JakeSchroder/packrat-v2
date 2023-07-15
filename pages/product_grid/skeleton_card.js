export default function SkeletonCard() {
  return (
    <>
      <div className="rounded-md h-[250px] w-[200px]">
        <div className=" animate-pulse flex-rows space-y-3">
          <div className=" bg-secondary-button w-[180px] h-[225px] rounded-lg"></div>
          <div className=" justify-self-end bg-secondary-button w-[180px] h-[20px] rounded-md"></div>
        </div>
      </div>
    </>
  );
}
