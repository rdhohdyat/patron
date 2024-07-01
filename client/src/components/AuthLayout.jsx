export const AuthLayout = ({ children }) => {
  return (
    <div className="w-full lg:grid lg:min-h-[650px] lg:grid-cols-2 ">
      {children}
    </div>
  );
};
