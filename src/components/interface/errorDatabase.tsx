export function ErrorDatabase() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black via-indigo-900 to-black">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/space.gif')" }}
        />
        <h1 className="text-white font-bold text-3xl md:text-6xl animate-pulse">
          You got lost in the space ...
        </h1>
        <h2 className="z-30 text-gray-400 text-sm md:text-xl mt-4">
          Sorry, we couldn't connect to the database.
        </h2>
      </div>
    </div>
  );
}
