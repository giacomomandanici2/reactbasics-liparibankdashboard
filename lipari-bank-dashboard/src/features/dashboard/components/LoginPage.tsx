import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth/AuthContext";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const onSubmit = async (data: LoginFormValues) => {
    await auth.login(data.email, data.password);
    const from = (location.state as any)?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          backgroundColor: "#f0f0f0",
          padding: "50px",
          borderRadius: "5px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email obbligatoria",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Email non valida" },
            })}
          />
          <div>
            {errors.email && (
              <span
                style={{ color: "red", fontSize: "14px" }}
                className="error"
              >
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password obbligatoria",
              minLength: { value: 6, message: "Almeno 6 caratteri" },
            })}
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: "14px" }} className="error">
              {errors.password.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Accesso..." : "Login"}
        </button>
      </form>
    </div>
  );
}
