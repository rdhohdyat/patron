export const MainLayout = ({ children }) => {
  return (
    <div className="w-full p-5 pt-24 sm:pt-28">
      <div className="sm:w-[80%] mx-auto">{children}</div>
    </div>
  );
};
