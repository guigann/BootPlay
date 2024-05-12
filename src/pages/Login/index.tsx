import { FormEvent, useState } from 'react'
import Input from '../../components/Input';
import Form from '../../components/Form';
import SubmitButton from '../../components/SubmitButton';
import background from '../../assets/imgs/background.jpeg';
import { useAuth } from '../../hooks/UseAuth';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, login } = useAuth();
    const _navigate = useNavigate();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        const toastId = toast.loading("Autenticando...");

        await login(email, password).then(() => {
            toast.dismiss(toastId);
            toast.success("Login realizado com sucesso!");
            _navigate('/dashboard')
        }).catch((error) => {
            toast.dismiss(toastId);
            if (error.code == 'ERR_BAD_REQUEST') {
                toast.error("Email ou senha inválido!");
            } else
                toast.error("Erro ao realizar login!");

            console.log(error)
        })

    }

    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <main>
                <main className="flex justify-center items-center relative h-screen">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-no-repeat bg-center bg-cover filter blur-md" style={{ backgroundImage: `url(${background})` }}></div>
                    </div>

                    <div className="z-10">
                        <Form onSubmit={handleLogin} title="Acesse sua conta" footer="Ainda não tem uma conta?" link="Inscrever-se" href="/signup">
                            <Input onChange={e => setEmail(e.target.value)} type='email' required>Email</Input>
                            <Input onChange={e => setPassword(e.target.value)} type='password' required>Senha</Input>

                            <SubmitButton>Entrar</SubmitButton>
                        </Form>
                    </div>
                </main>
            </main>
        </>
    )
}
