interface KostErrorProps {
  message?: string;
}

const KostError = ({ message }: KostErrorProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Terjadi Kesalahan
      </h2>
      <p className="text-gray-500">{message || "Silakan coba lagi nanti."}</p>
    </div>
  );
};

export default KostError;
