

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-8xl font-bold mb-2">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <a href="/" className="text-blue-500 hover:underline">
            Go back to Home
        </a>
        </div>
    );
}

export default NotFound;