export default function ModelTracking(props: { setIsShown: (isShown: boolean) => void }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => props.setIsShown(false)}></div>
        <div className="bg-white p-3 rounded-lg shadow-lg z-10">
          <div className="m-2 p-2 overflow-auto max-h-[85%] m-auto">
            <h2 className="text-xl font-extrabold text-center underline-decoration ">Tracking de Cargas</h2>
            <p className="text-md font-bold">¡Estamos trabajando para poder brindar esta información pronto!</p>
          </div>
        </div>
      </div>
    </>
  );
}
