import React, { useEffect, useState } from 'react'

const Library = ({books,theme}) => {
    const [data, setdata] = useState([])
    useEffect(()=>{
        setdata(books);
    },[books])

    function TextLimit(props) {
        const { text, limit, book } = props;
      
        if (text.length <= limit) {
          return <td className={`${theme === "true" ? "bg-neutral text-base-100" : ""}`}><a className='hover:underline hover:text-primary' href={`https://openlibrary.org/${book?.key}/${book?.title.split(" ").join("_")}`}>{text}</a></td>;
        } else {
          const truncatedText = text.substring(0, limit) + "...";
          return <td className={`${theme === "true" ? "bg-neutral text-base-100" : ""}`}><a className='hover:underline hover:text-primary' href={`https://openlibrary.org/${book?.key}/${book?.title.split(" ").join("_")}`}>{truncatedText}</a></td>;
        }
      }

  return (
        <div className="rounded-lg overflow-x-auto m-5 h-[30rem]">
            <table className={`${theme === "true" ? "border-base-content/90" : "border-base-content/10"} border-[1px] table w-full`}>
                {/* head */}
                <thead>
                <tr>
                    <th className='bg-primary'>Title and Sub Title</th>
                    <th className='bg-primary'>Author</th>
                    <th className='bg-primary'>Year of Publication</th>
                </tr>
                </thead>
                <tbody>
                {/* rows */}
                {data?.map((book)=>(
                    <tr key={book?.key}>
                        <TextLimit text={book?.title} book={book} limit={35} />
                        {book?.author_name===undefined ? " " : <td className={`${theme === "true" ? "bg-neutral text-base-100" : ""}`}>{book?.author_name[0]}</td>}
                        {book?.authors===undefined ? " " : <td className={`${theme === "true" ? "bg-neutral text-base-100" : ""}`}>{book?.authors[0]?.name}</td>}
                        <td className={`${theme === "true" ? "bg-neutral text-base-100  " : ""}`}>{book.first_publish_year}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
  )
}

export default Library