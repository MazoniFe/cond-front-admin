import { useState } from 'react';
import Spinner from './Spinner';

interface DialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
}


const SimpleDialog = ({ title, message, onConfirm, onClose }: DialogProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    const handleConfirm = async () => {
        setIsLoading(true); 
        try {
            await onConfirm(); 
            handleClose(); 
        } finally {
            setIsLoading(false); // Finaliza o loading
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClose}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner />
                </div>
            )}
            <div
                className={`relative m-4 p-4 w-2/5 min-w-[300px] max-w-[500px] rounded-lg bg-white shadow-sm transition-transform duration-300 transform ${isVisible ? 'scale-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                    {title}
                </div>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    <div className="mb-4">{message}</div>
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
                        onClick={handleConfirm} // Chama a função de confirmação ao clicar em "Confirmar"
                        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="button"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimpleDialog;
