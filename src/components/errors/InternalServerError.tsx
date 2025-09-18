const InternalServerError = ({
  message = "Terjadi kesalahan pada server.",
}: {
  message?: string;
}) => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold text-red-500">
        500 - Server Error
      </h2>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
};

export default InternalServerError;
