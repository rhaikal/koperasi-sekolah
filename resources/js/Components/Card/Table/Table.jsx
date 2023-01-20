import React from "react";

const Table = ({children}) => {
    return (
        <div className="block w-full min-w-0 break-words mb-6 rounded bg-white">
            <table className="items-center w-full bg-transparent border-collapse relative">
                {children}
            </table>
        </div>
    )
}

const Row = ({children, className}) => {
    return (
        <tr className={className}>{children}</tr>
    )
}

const Head = ({children}) => {
    return (
        <thead>
            <Row>
                {children}
            </Row>
        </thead>
    )
}

const Body = ({children}) => {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

const Header = ({children}) => {
    return (
        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            {children}
        </th>
    )
}

const Content = ({className="", type="text", colSpan,  children}) => {
    let contentClass = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ";

    if(type === 'image' || type === 'header'){
        if(type === 'image') contentClass += "items-center h-12 w-12 bg-white rounded-full border-b-0 "
        else if(type === 'header') contentClass += "text-left items-center font-bold "

        return (
            <th colSpan={colSpan} className={contentClass + className}>
                {children}
            </th>
        )
    } else {
        return (
            <td colSpan={colSpan} className={contentClass + className}>
                {children}
            </td>
        )
    }
}

Table.Row = Row
Table.Head = Head
Table.Body = Body
Table.Header = Header
Table.Content = Content

export default Table
