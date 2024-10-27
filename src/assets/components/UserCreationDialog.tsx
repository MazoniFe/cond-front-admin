import { useState } from 'react';
import { getUsers, postUser } from '../../service/AdminService';
import { InsertUserDTO, User } from './types';
import Spinner from './Spinner';
import { useDispatch } from 'react-redux';
import { overwriteUsers } from '../../features/UserSlice';

type UserCreationDialogProps = {
    onClose: () => void;
  };

const UserCreationDialog = ({ onClose }: UserCreationDialogProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('DEFAULT');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const insertUser: InsertUserDTO = {
            firstName,
            lastName,
            email,
            userType: userType as 'DEFAULT' | 'SUPER_ADMIN' | 'ADMIN',
            password
        }
        setIsLoading(true);
        try {
            // Espera o usuário ser inserido antes de buscar a lista de usuários
            await postUser(insertUser);
            await fetchUsers(); // Chama a função fetchUsers para atualizar a lista
    
        } catch (e) {
            console.error(e);
    
        } finally {
            setIsLoading(false);
        }
        handleClose();
    };
    
    const fetchUsers = async (filter = '') => {
        try {
            const response: User[] = await getUsers(filter);
            dispatch(overwriteUsers(response));
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            data-dialog-backdrop="animated-dialog"
            data-dialog-backdrop-close="true"
            className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClose}
        >
            <div
                data-dialog="animated-dialog"
                className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">

                        <div className="loader">
                            <Spinner></Spinner>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                            Criação de Usuário
                        </div>
                        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">Nome</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">Sobrenome</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">Tipo de Usuário</label>
                                <select
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 rounded-md p-2"
                                >
                                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="DEFAULT">MORADOR</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full border border-slate-300 rounded-md p-2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                            <button
                                onClick={handleClose} // Fecha o modal ao clicar em "Cancelar"
                                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit} // Chama a função de submissão ao clicar em "Confirmar"
                                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                type="button"
                            >
                                Confirmar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default UserCreationDialog;
