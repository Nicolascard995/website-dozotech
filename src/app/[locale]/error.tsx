'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
                Algo salió mal.
            </h2>
            <p className="text-slate-400 mb-8 max-w-md">
                Ha ocurrido un error inesperado. Nuestro sistema ya ha sido notificado.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-cyan text-obsidian font-bold rounded-lg uppercase tracking-widest hover:bg-cyan/90 transition-all"
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
