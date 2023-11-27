import React, { useState, useContext, useRef } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { CryptoContext } from '../Context/CryptoContext';

const PerPage = () => {
    const { setPerPage } = useContext(CryptoContext);
    const inputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        let val = inputRef.current.value;

        if(val !== 0) {
            setPerPage(val);
            inputRef.current.value = val;
        }
    }

    return (
        <form 
          className="relative flex lg:items-center font-tertiary mr-12 lg:ml-0 ml-16 mt-8 md:mt-0"
          onSubmit={handleSubmit}
        >
          <label htmlFor="perpage"
            className="relative flex justify-center items-center mr-2 font-bold"
          >
            per page:{" "}
          </label>
          <input 
            type="number" 
            name="perpage" 
            min={1}
            max={250}
            placeholder="10"
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100 outline-0 pl-2 required border border-transparent focus:border-cyan leading-6"
            ref={inputRef}
          />
          <button type="submit" className="ml-1 cursor-pointer text-cyan hover:scale-110 transition-all ease-linear">
            <AiOutlineSend size={26} className="w-full h-auto" />
          </button>
        </form>
    )
}

const Pagination = () => {

  let {page, setPage, totalPages, perPage, cryptoData } = useContext(CryptoContext);
  const TotalNumber = Math.ceil(totalPages/perPage);

  const Next = ()=> {
    if (page === TotalNumber) {
        return null;
    } else {
        setPage(page + 1);
    }
  }

  const Prev = ()=> {
    if (page === 1) {
        return null;
    } else {
        setPage(page - 1);
    }
  }

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
        setPage(TotalNumber - 1)
    } else {
        setPage(page + 3)
    }
  }

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
        setPage(TotalNumber + 1)
    } else {
        setPage(page - 2)
    }
  };

  if(cryptoData && cryptoData.length >= perPage) {
    return (
        <div className="flex lg:flex-row flex-col items-center justify-end text-sm gap-y-8 md:gap-y-4">
            <PerPage />
            <ul className="flex items-center gap-x-1.5">
                <li className="flex items-center">
                    <button className="outline-0 hover:text-cyan w-8 hover:scale-110 transition-all ease-linear" onClick={Prev}>
                        <BsArrowLeftCircle 
                            size={35} 
                            className="text-cyan cursor-pointer"
                        />
                    </button>
                </li>
                {
                    page + 1 === TotalNumber || page === TotalNumber ? 
                    <li>
                        <button className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
                        onClick={multiStepPrev}
                        >
                            ...
                        </button>
                    </li> : null
                }
                {
                    page - 1 !== 0 ? 
                    <li>
                        <button className="outline-0 hover:text-cyan hover:bg-gray-100 bg-gray-200 transition-all ease-linear text-white rounded-full w-8 h-8 flex items-center justify-center font-tertiary"
                        onClick={Prev}
                        >
                            {page - 1}
                        </button>
                    </li> : null
                }
                <li>
                    <button disabled className="outline-0 bg-cyan text-gray-300 rounded-full w-8 h-8 flex items-center justify-center font-tertiary">
                        {page}
                    </button>
                </li>
                {
                    page + 1 !== TotalNumber && page !== TotalNumber ? 
                    <li>
                        <button className="outline-0 hover:text-cyan hover:bg-gray-100 bg-gray-200 transition-all ease-linear text-white rounded-full w-8 h-8 flex items-center justify-center font-tertiary"
                        onClick={Next}
                        >
                            {page + 1}
                        </button>
                    </li> : null
                }
                {
                    page + 1 !== TotalNumber && page !== TotalNumber ? 
                    <li>
                        <button className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
                        onClick={multiStepNext}
                        >
                            ...
                        </button>
                    </li> : null
                }
                {
                    page !== TotalNumber ? 
                    <li>
                        <button className="outline-0 hover:text-cyan transition-all ease-linear hover:bg-gray-200 bg-cyan text-gray-300 rounded-full w-8 h-8 flex items-center justify-center font-tertiary"
                        onClick={() => setPage(TotalNumber)}
                        >
                            {TotalNumber}
                        </button>
                    </li> : null
                }
                <li className="flex items-center">
                    <button className="outline-0 hover:text-cyan w-8 hover:scale-110 transition-all ease-linear" onClick={Next}>
                        <BsArrowRightCircle 
                            size={35} 
                            className="text-cyan cursor-pointer"
                        />
                    </button>
                </li>
            </ul>
        </div>
    )
  }; 
}

export default Pagination;