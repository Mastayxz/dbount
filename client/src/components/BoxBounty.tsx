interface Props {
    children?: React.ReactNode;
    className?: string;
}

const BoxBounty: React.FC<Props> = ({ children, className = "" }) => {
    return (
        <div
        className={`
            w-auto h-auto shadow-md bg-gray-400 rounded-xl hover:scale-105  transition-all duration-300 p-4
            ${className}
            `}
        >
            <h1 className="text-2xl font-bold mb-4">Bounty Problems</h1>
            <p className="text-gray-600 mb-6">
                Here you can find all the problems available for bounty.
            </p>
            {children}
        </div>
    );
}
export default BoxBounty