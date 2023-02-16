const Overview = ({header, children}) => {
    return (
        <div className="my-5 bg-white rounded shadow-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-200/60 w-full rounded-t">
                <h3 className="text-xl font-semibold leading-6 text-stone-700">{header}</h3>
            </div>
            <div className="border-t border-gray-200 py-5">
                {children}
            </div>
        </div>
    )
}

const Content = ({children, image}) => {
    return (
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            {image && <div className="flex items-center justify-center w-full">
                <img src={"/storage/" + image} className="min-h-100 min-w-100"></img>
            </div>}
            <div className={"self-center " + (image ? 'lg:col-span-2 ' : 'lg:col-span-3')}>
                {children}
            </div>
        </div>
    )
}

const List = ({header, children}) => {
    return (
        <div className="mr-6 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-gray-500">{header}</div>
            <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{children}</div>
        </div>
    )
}

Overview.Content = Content
Overview.List = List

export default Overview
