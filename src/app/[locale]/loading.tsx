export default function Loading() {
    return (
        <div className="fixed inset-0 bg-obsidian z-50 flex items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-acid-lime rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-acid-lime font-mono text-xs animate-pulse">
                    LOAD
                </div>
            </div>
        </div>
    );
}
