import LoginForm from "@/components/account/LoginForm";
import Logo from "@/shared/Logo/Logo";

const PageLogin = () => {
  return (
    <main>
      <div
        data-nc-id="PageLogin"
        className="container h-screen flex justify-center items-center"
      >
        <div className="flex items-center flex-col gap-5 w-[400px] bg-white px-5 py-10">
          <div className="ml-0.5">
            <Logo />
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default PageLogin;
