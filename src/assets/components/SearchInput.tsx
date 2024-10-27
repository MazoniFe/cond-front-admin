import React from 'react';
import { IoMdSearch } from "react-icons/io";


interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Pesquisar..." }) => {
  return (
    <div className="relative flex items-center">
      <IoMdSearch size={25} className="absolute left-3 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;