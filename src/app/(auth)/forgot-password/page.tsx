import ForgotPasswordForm from "@/features/auth/components/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <>
      {/* <Suspense fallback={<h1 className="text-center">Loading...</h1>}> */}
      <ForgotPasswordForm />
      {/* </Suspense> */}
    </>
  );
};

export default ForgotPasswordPage;
