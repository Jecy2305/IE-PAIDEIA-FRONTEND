import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import bibliotecaImg from "../../resources/imgs/biblioteca.png";
import solImg from "../../resources/imgs/sol.png";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../../AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Limpiar cualquier mensaje de error previo
    try {
      const response = await fetch("https://localhost:44307/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contraseña }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
  
        // Guardar los datos del usuario en localStorage y en el contexto
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
  
        // Verificar el rol y redirigir
        if (data.rolId === 1) {
          navigate("/home"); // Redirigir a Home si rolId es 1
        } else if (data.rolId === 3) {
          navigate("/dashboard"); // Redirigir a Dashboard si rolId es 3
        }
  
      } else {
        console.error("Error de inicio de sesión:", response.statusText);
        setErrorMessage("Correo o contraseña inválidos");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setErrorMessage("Error al iniciar sesión. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container__login">
      <div className="container__login__main">
        <div className="container__login__form">
          <div className="container__login__form-texts">
            <h1>Bienvenido</h1>
            <p>Nos alegra verte de nuevo con nosotros</p>
          </div>

          <form onSubmit={handleLogin} className="formulario-login">
            <div className="form-label">
              <Mail />
              <input
                type="text"
                placeholder="Correo"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-label">
              <Lock />
              <input
                type="password"
                placeholder="Contraseña"
                id="contraseña"
                name="contraseña"
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "INICIAR SESION"}
            </button>
          </form>
        </div>

        <div className="container__login__img">
          <img src={bibliotecaImg} alt="biblioteca" />
        </div>
      </div>

      <img src={solImg} alt="sol" id="solImg" />
    </div>
  );
}

export default Login;