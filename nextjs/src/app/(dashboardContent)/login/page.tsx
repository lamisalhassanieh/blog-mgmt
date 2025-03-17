import { Suspense } from 'react';
import LoginForm from "@/app/components/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <div>
      <main>
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}

export default Login;