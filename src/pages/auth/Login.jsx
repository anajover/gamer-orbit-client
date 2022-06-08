import { useState, useContext } from "react";
import { loginService } from "../../services/auth.services";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.js"

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate()

  const handleUsername = (event) => {
      console.log(event.target.value);
      setUsername(event.target.value)
    }

    const handlePassword = (event) => {
      console.log(event.target.value);
      setPassword(event.target.value)
    }


  const handleLogin = async (event) => {
    event.preventDefault();
    const user = { 
      username,
      password }

      try {
        // validaremos al usuario
        const response = await loginService(user)
        // console.log("usuario validado", response.data)
        // guardamos el token en localStorage
        // localStorage es el lugar local donde se guarda la informacion y setItem el método interno para acceder al localStorage y guardar información.
        localStorage.setItem("authToken", response.data.authToken)
        // después de retornar el isLoggedIn en auth.context.js hay que ponerle un await  a authenticateUser()
        await authenticateUser()
        //asignar los valores a los estados globales para manejo en 
        navigate("/profile")

      } catch (error) {

        if (error.response.status === 400 || error.response.status === 401) {
          setErrorMessage(error.response.data.errorMessage)
        } else {
          // navigate
          navigate("/error")
        }
      }
  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>

        <br />

        <Link to={"/signup"}>Not registered? Sign up!</Link>

        <br /><br />

        {/* Si el mensaje de error no es nulo, es que se ha seteado como que algo pasa a lo largo del código, y se mostraría aquí. */}
        { errorMessage !== null && <p>{errorMessage}</p> }

      </form>
      
    </div>
  );
}

export default Login;
