export const FormContainer = ({ children }) => {
  return (
    <main className="w-full min-h-screen bg-secondary flex justify-center items-center absolute left-0 top-0">
      <div className="m-4 p-8 bg-white rounded-xl max-w-md w-[26rem]">
        {children}
      </div>
    </main>
  );
};
