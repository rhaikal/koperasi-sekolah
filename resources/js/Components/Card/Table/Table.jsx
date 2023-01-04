import React from "react";

const Table = ({children}) => {
    return (
        <div className="block w-full min-w-0 break-words mb-6 rounded bg-white">
            <table className="items-center w-full bg-transparent border-collapse">
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
        if(type === 'image') contentClass += "items-center h-12 w-12 bg-white rounded-full border "
        else if(type === 'header') contentClass += "text-left flex items-center font-bold "

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

// export default function CardTable({links, headers, contents }) {
//     // const rows = []
//     // const actions = []

//     // contents.map(value => {
//     //     Object.keys(value).map(key, index => {
//     //         if(key === 'id') {
//     //             rows.push(<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center font-bold" key={index}>
//     //                 {value[key]}
//     //             </th>)
//     //         } else if (key === 'image' || key === 'picture') {
//     //             rows.push(<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center h-12 w-12 bg-white rounded-full border" key={index}>
//     //                 <img className="h-12 w-12 bg-white rounded-full border mr-3" src={value[key]} alt="..." />
//     //             </th>)
//     //         } else {
//     //             rows.push(<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" key={index}>
//     //                 {value[key]}
//     //             </td>)
//     //         }
//     //     })

//     //     links.map(link, placeholder => {
//     //         actions.push(<Dropdown.Link href={link}>{placeholder}</Dropdown.Link>)
//     //     })

//     //     rows.push(<td>
//     //         <Dropdown>
//     //             <Dropdown.Trigger>
//     //                 <SlOptionsVertical />
//     //             </Dropdown.Trigger>
//     //             <Dropdown.Content>
//     //                 {actions}
//     //             </Dropdown.Content>
//     //         </Dropdown>
//     //     </td>)
//     // })

//     return (
//     <>
//       <div
//         className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
//       >
//         <div className="block w-full overflow-x-auto">
//           {/* Projects table */}
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead>
//               <tr>
//                 {headers.map((value, index) => (
//                     <th key={index} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
//                         {value}
//                     </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//                 <tr>

//                 </tr>
//                 {/* {content.map((value, index) => (<tr key={index}>{
//                     Object.keys(value).map((key, id) => {
//                         return (<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" key={id}>{value[key]}</td>);
//                     })
//                 }</tr>))} */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//     // <>

//     // </>
//     )
// }
