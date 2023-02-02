
export default function Label({icon, iconClass, text, count})
{
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className={`p-3 mr-4 rounded-full ${iconClass}`}>
                {icon}
            </div>
            <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {text}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {!!count ? count : 0}
            </p>
            </div>
        </div>
    )
}
