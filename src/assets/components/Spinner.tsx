const Spinner = ({ size = 'medium', color = 'blue' }) => {
    const sizeClasses = {
        small: 'h-4 w-4',
        medium: 'h-8 w-8',
        large: 'h-12 w-12',
    };

    const colorClasses = {
        blue: 'text-blue-500',
        red: 'text-red-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
        white: 'text-white',
    };

    return (
        <div
            className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
            role="status"
        >
            <span
                className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
            >
                Loading...
            </span>
        </div>
    );
};

export default Spinner;
