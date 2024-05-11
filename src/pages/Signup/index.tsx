import { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import Form from '../../components/Form';
import background from '../../assets/imgs/background.jpeg'
import toast from 'react-hot-toast';
import { user_api } from '@/services/ApiService';
import { Loader2 } from 'lucide-react';
import SubmitButton from '@/components/SubmitButton';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Signup() {
    const { isAuthenticated } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const _navigate = useNavigate();

    async function handleSigup(event: FormEvent) {
        setLoading(true);
        const toastId = toast.loading("Criando conta...");
        event.preventDefault();

        const data = {
            name,
            email,
            password
        };

        console.log(data);

        await user_api.post("/users/create", data)
            .then(result => {
                console.log(result.data);
                toast.dismiss(toastId);
                toast.success("Conta criada com sucesso!");
                setLoading(false);
                _navigate('/login')
            }).catch(error => {
                setLoading(false);
                toast.success("Erro ao criar conta!");
                console.log(error);
            });
    }

    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <main className="flex justify-center items-center relative h-screen">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-no-repeat bg-center bg-cover filter blur-md" style={{ backgroundImage: `url(${background})` }}></div>
                </div>

                <div className="z-10">
                    <Form onSubmit={handleSigup} title="Criar Conta" footer="Já tem uma conta?" link="Entrar" href="/login">
                        <Input type='text' onChange={event => setName(event.target.value)}>Nome Completo</Input>
                        <Input type='email' onChange={event => setEmail(event.target.value)} required>Email</Input>
                        <Input type='password' onChange={event => setPassword(event.target.value)} required>Senha</Input>

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
    )
}
