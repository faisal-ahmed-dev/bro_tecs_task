import React, { ChangeEvent } from 'react';
import Input from '../../app/components/ui/Input';
import Select from '../../app/components/ui/Select';
import Button from './Button';
import { FilterParams } from '../../app/types/employee';
import { Plus, Search, Trash2 } from 'lucide-react';

const Filters: React.FC<{
  groups: { value: string; text: string }[];
  activeOptions: { value: string; text: string }[];
  filters: FilterParams;
  onInputChange: (name: string, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}> = React.memo(({ groups, activeOptions, filters, onInputChange, onSearch, onClear }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onInputChange(e.target.name, e.target.value);
  };

  return (
      <div className="mb-6 p-4 bg-white border-b rounded-xl shadow">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Input
              label="Company Name"
              name="searchCompanyName"
              value={filters.searchCompanyName ?? ''}
              onChange={handleChange}
              placeholder="Enter company name"
          />
          <Select
              label="Group"
              name="searchGroupId"
              className='bg-white'
              value={filters.searchGroupId.toString()}
              onChange={handleChange}
              options={groups}
          />
          <Input
              label="VAT Number"
              name="searchVatNumber"
              value={filters.searchVatNumber ?? ''}
              onChange={handleChange}
              placeholder="Enter VAT number"
          />
          <Select
              label="Status"
              name="searchActiveId"
              className='bg-white'

              value={filters.searchActiveId.toString()}
              onChange={handleChange}
              options={activeOptions}
          />
        </div>
        <div className="flex flex-wrap justify-start md:justify-center items-center mt-4 space-x-4">
          <Button className='btn bg-secondary flex  items-center space-x-2' onClick={onSearch}>      <Search className="w-5 text-white h-5" />
          <div className='text-white'>Search</div></Button>
          <Button onClick={onClear} className=" flex items-center space-x-2 bg-gray-100  hover:bg-gray-200 ">
          <Trash2 className='text-black w-5 h-5'  /> <div className='text-black'> Clear </div> 
          </Button>
        </div>
      </div>
  );
});

export default Filters;
