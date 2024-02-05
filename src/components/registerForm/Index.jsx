'use client';

const RegisterForm = () =>{

  const onSubmit = (e) =>{
    e.preventDefault();
    console.log("Formulario Enviado!");
  }

  return(
    <form onSubmit={onSubmit}>
      <h1>Register Page</h1>

      <label htmlFor="name">Nome</label>
      <input type="name" id="name" name="name" />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" name="password" />

      <button type="submit">Entrar</button>
    </form>
  )
}

export default RegisterForm;