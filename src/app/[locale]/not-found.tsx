import { Link } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-obsidian pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-xl space-y-8">
                    <h1 className="text-8xl font-black text-cyan font-display">404</h1>
                    <h2 className="text-3xl font-bold text-white">
                        Página no encontrada
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-acid-lime text-obsidian font-bold rounded-xl uppercase tracking-widest hover:bg-acid-lime/90 transition-all"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
