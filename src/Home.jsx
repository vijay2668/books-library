import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import Library from './HomeComponents/Library';
import Pagination from './HomeComponents/Pagination';
import Loader from "./HomeComponents/Loader"
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const url = 'https://openlibrary.org/subjects/love.json';
  const [err, seterr] = useState(false);

  const get = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setBooks(data.works);
        data.works.length > 0 ? setLoading(false) : setLoading(true);
      })
      .catch((error) => seterr(true));
  }

  useEffect(() => {
    return () => get();
  }, []);
    
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  let currentBooks;
  let paginate;

    if(query?.length > 0 && searchResults.length > 0){
      // get current books
      const indexOfLastBook = currentPage * booksPerPage;
      const indexOfFirstBook = indexOfLastBook - booksPerPage;
      currentBooks = searchResults?.slice(indexOfFirstBook, indexOfLastBook);
      
      // change page
      paginate = (pageNumber) => setCurrentPage(pageNumber);
    } 
    else if(books?.length > 0) {
      // get current books
      const indexOfLastBook = currentPage * booksPerPage;
      const indexOfFirstBook = indexOfLastBook - booksPerPage;
      currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);
      
      // change page
      paginate = (pageNumber) => setCurrentPage(pageNumber);
    }
  
  const handleSearch = async () => {
    setBooks([]);
    setLoading(true);
    const url = `https://openlibrary.org/search.json?q=${query}`;
      await  fetch(url)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.docs))
        .catch((error) => seterr(true));
        setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };

    var div = document.querySelector("html");
    const [theme, settheme] = useState(localStorage.getItem("themeDark"))
    function toggleClass() {
      div.classList.toggle("dark");
      var hasClass = div.classList.contains("dark");
      localStorage.setItem("themeDark", hasClass);
      settheme(localStorage.getItem("themeDark"));
    }
    
    window.onload = function () {
      var div = document.querySelector("html");
      var hasClass = localStorage.getItem("themeDark");
      if (hasClass === "true") {
        div.classList.add("dark");
      } else {
        div.classList.remove("dark");
      }
    };
    
    
    function clear(){
      setQuery("")
      get();
    }
    
    function trendingSubject(e){
      setLoading(true)
      let trend = `https://openlibrary.org/subjects/${e.target.textContent.split(" ").join("_")}.json` 
      fetch(trend)
      .then((response) => response.json())
      .then((data) => {
        data.works.length > 0 ? setLoading(false) : setLoading(true);
        setBooks(data.works);
        // console.log(data.works)
      })
      .catch((error) => seterr(true));
    }

    
  return (
    <div className='flex'>
      {/* sidebar */}
        <div
          className="duration-500 z-10 h-[100vh] shadow-lg shadow-primary bg-primary"
          style={{
            width: `${isExpanded ? "15rem" : "0"}`
          }}
        >
          {/* content goes here */}
          <div
            className={`${isExpanded? "block" : "hidden"} text-center flex m-5 flex-col btn-group btn-group-vertical`}>
            <div className='text-lg font-semibold mb-2'>Trending Subjects</div>
            <button onClick={trendingSubject} className="btn uppercase">javascript</button>
            <button onClick={trendingSubject} className="btn uppercase">css</button>
            <button onClick={trendingSubject} className="btn uppercase">html</button>
            <button onClick={trendingSubject} className="btn uppercase">harry potter</button>
            <button onClick={trendingSubject} className="btn uppercase">crypto</button>
          </div>
        </div>
      {/* screen */}
      <div className={`w-[100vw] z-0 ${theme === "true" ? "bg-neutral" : ""}`}>
        <div className={`navbar max-w-8xl p-0 sm:px-10 ${theme === "true" ? "bg-neutral text-base-100" : "bg-base-100"} shadow-lg`}>
          <div className="flex-1">
            <div onClick={() => window.location.reload(true)} className={`${theme === "true" ? "hover:bg-base-100/20" : ""} btn btn-ghost normal-case text-xl`}>Books Library</div>
          </div>
          <div className="flex-none gap-2">
            <label className="swap sm:mr-5 swap-rotate">
              
              <input onClick={toggleClass} type="checkbox" />
              {theme === "true" ? 
                  <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                  : <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                }
              
            </label>
            <form onSubmit={handleSubmit} className="form-control relative">
              <input
                type="text"
                value={query}
                placeholder="Search"
                onChange={e => setQuery(e.target.value)}
                className={`input w-40 sm:w-fit input-bordered ${theme === "true" ? "bg-neutral text-base-100 border-base-content/90 focus:border-base-100" : "bg-base-100"}`}
              />
              <IoIosClose onClick={clear} className={`absolute cursor-pointer text-3xl right-0 top-2.5 ${query.length > 0 ? "block" : "hidden"}`}/>
              <div onClick={handleSearch} className='p-2 duration-300 absolute -right-11 hover:bg-primary rounded-lg hover:text-base-100 cursor-pointer top-1'>
                <BiSearch className=' text-2xl'/>
              </div>
            </form>
            <label  className={`${theme === "true" ? "text-base-100" : "text-neutral/80"} btn btn-circle ml-7 sm:ml-10 bg-transparent hover:bg-transparent border-0 swap swap-rotate`}>
      
              {/* <!-- this hidden checkbox controls the state --> */}
              <input type="checkbox" onClick={handleClick} />
              
              {/* <!-- hamburger icon --> */}
              <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
              
              {/* <!-- close icon --> */}
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
              
            </label>
          </div>
        </div>
        {err ? ( 
          <p className={`${theme === "true" ? "text-base-100" : "text-neutral/80"} text-4xl ml-14 mt-5`}>No results found</p> 
          ) : (
            <>
              {loading ? <Loader theme={theme} /> : <Library theme={theme} books={currentBooks} />}
              <Pagination
              booksPerPage={booksPerPage}
              totalBooks={query.length > 0 ? searchResults?.length : books?.length}
              paginate={paginate}
              />
            </>
            )}
      </div>
    </div>
  );
};

export default Home;
