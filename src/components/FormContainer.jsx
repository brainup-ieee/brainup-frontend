export const FormContainer = ({ children }) => {
  return (
    <main className="w-full min-h-screen bg-secondary flex justify-center items-center">
      <div className="m-4 p-8 bg-white rounded-xl max-w-md w-[26rem]">
        {children}
      </div>
    </main>
  );
};
