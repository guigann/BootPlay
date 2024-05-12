import { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import Form from '../../components/Form';
import background from '../../assets/imgs/background.jpeg';
import toast from 'react-hot-toast';
import { user_api } from '@/services/ApiService';
import { Loader2 } from 'lucide-react';
import SubmitButton from '@/components/SubmitButton';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Signup() {
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const _navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameValue = event.target.value;
        setName(nameValue);
        setNameError(!nameValue ? 'O nome é obrigatório.' : nameValue.length < 3 ? 'O nome deve ter no mínimo 3 caracteres.' : '');
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(emailValue);
        setEmailError(!emailValue ? 'O email é obrigatório.' : !re.test(emailValue) ? 'Por favor, insira um email válido.' : '');
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        setPasswordError(!passwordValue ? 'A senha é obrigatória.' : passwordValue.length < 3 ? 'A senha deve ter no mínimo 3 caracteres.' : '')
    };

    async function handleSignup(event: FormEvent) {
        event.preventDefault();

        if (nameError || emailError || passwordError) {
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Criando conta...");

        const data = {
            name,
            email,
            password
        };

        console.log(data);

        await user_api.post("/users/create", data).then((result) => {
            console.log(result.data);
            toast.dismiss(toastId);
            toast.success("Conta criada com sucesso!");
            setLoading(false);
            _navigate('/login');
        }).catch((error) => {
            toast.dismiss(toastId);
            if (error.code == 'ERR_BAD_REQUEST') {
                toast.error("Já existe um usuário com este email!");
            } else
                toast.error("Erro ao criar conta!");

            setLoading(false);
            console.log(error);
        })
    }

    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <main className="flex justify-center items-center relative h-screen">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-no-repeat bg-center bg-cover filter blur-md" style={{ backgroundImage: `url(${background})` }}></div>
                </div>

                <div className="z-10">
                    <Form onSubmit={handleSignup} title="Criar Conta" footer="Já tem uma conta?" link="Entrar" href="/login">
                        <Input type='text' onChange={handleNameChange}>Nome Completo</Input>
                        {nameError && <span className="text-red-500 text-sm">{nameError}</span>}

                        <Input type='email' onChange={handleEmailChange} required>Email</Input>
                        {emailError && <span className="text-red-500 text-sm">{emailError}</span>}

                        <Input type='password' onChange={handlePasswordChange} required>Senha</Input>
                        {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}

                        {loading ?
                            <SubmitButton disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Carregando...
                            </SubmitButton>
                            :
                            <SubmitButton>Inscrever-se</SubmitButton>
                        }

                    </Form>
                </div>
            </main>
        </>
    );

}
