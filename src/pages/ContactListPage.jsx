import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaSearch } from 'react-icons/fa';

// GlobalFilter component remains the same
const GlobalFilter = ({ filter, setFilter }) => (
    <div className="search-input-wrapper">
      <FaSearch />
      <input
        type="text"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search all columns..."
        className="search-input"
      />
    </div>
);


const ContactListPage = () => {
  const data = useSelector((state) => state.contacts.data);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // --- UPDATED: All columns are now included ---
  const columns = useMemo(
    () => [
      {
        header: 'Edit',
        id: 'edit',
        cell: ({ row }) => (
          <Link to={`/contacts/edit/${row.original.id}`} className="edit-btn">
            <FaEdit size={18} />
          </Link>
        ),
        enableSorting: false,
      },
      { header: 'Name', accessorKey: 'name', cell: (info) => <span className="name-cell">{info.getValue()}</span> },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Primary Phone', accessorKey: 'phone' },
      { header: 'Contact Owner', accessorKey: 'contactOwner' },
      { header: 'Account Name', accessorKey: 'accountName' },
      { header: 'Contact Source', accessorKey: 'contactSource' },
      { header: 'Secondary Email', accessorKey: 'secondaryEmail' },
      { header: 'Mobile No 1', accessorKey: 'mobileNo1' },
      { header: 'Mobile No 2', accessorKey: 'mobileNo2' },
      { header: 'Twitter', accessorKey: 'twitter' },
      { header: 'Skype Id', accessorKey: 'skypeId' },
      { header: 'LinkedIn bio', accessorKey: 'linkedinBio' },
      { header: 'Appointment Status', accessorKey: 'appointmentStatus' },
      { header: 'Appointment Date', accessorKey: 'appointmentDate' },
      { header: 'Appointment Time', accessorKey: 'appointmentTime' },
      { header: 'City', accessorKey: 'city' },
      { header: 'State', accessorKey: 'state' },
      { header: 'Country', accessorKey: 'country' },
      { header: 'Address line', accessorKey: 'addressLine' },
      { header: 'Remarks', accessorKey: 'remarks' },
      { header: 'Created Date', accessorKey: 'createdDate' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
        sorting,
        globalFilter,
        columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
        pagination: {
            pageSize: 10,
        },
    }
  });

  const downloadExcel = () => {
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    XLSX.writeFile(workbook, 'FilteredContacts.xlsx');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-title">
          <h2>Contact List</h2>
          <p>Here is a List of Contact</p>
        </div>
        <div className="header-controls">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="btn btn-secondary">
            Filters
          </button>
          <button onClick={downloadExcel} className="btn btn-green">
            Export
          </button>
          <Link to="/contacts/create" className="btn btn-blue">
            + Create
          </Link>
        </div>
      </header>

      {showAdvancedFilters && (
        <div className="advanced-filter-container">
            <div className="filter-group">
                <label htmlFor="owner-filter">Filter by Owner</label>
                <input
                    id="owner-filter"
                    type="text"
                    value={(table.getColumn('contactOwner')?.getFilterValue() ?? '')}
                    onChange={e => table.getColumn('contactOwner')?.setFilterValue(e.target.value)}
                    placeholder="Owner name..."
                />
            </div>
            <div className="filter-group">
                <label htmlFor="source-filter">Filter by Source</label>
                 <select
                    id="source-filter"
                    value={(table.getColumn('contactSource')?.getFilterValue() ?? '')}
                    onChange={e => table.getColumn('contactSource')?.setFilterValue(e.target.value)}
                 >
                    <option value="">All Sources</option>
                    <option value="Database">Database</option>
                    <option value="Web">Web</option>
                    <option value="Referral">Referral</option>
                 </select>
            </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: <FaSortUp />, desc: <FaSortDown /> }[header.column.getIsSorted()] ?? (header.column.getCanSort() ? <FaSort style={{color: '#d1d5db'}} /> : null)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
         <span className="pagination-info">
          Showing {table.getRowModel().rows.length} of {data.length} entries
        </span>
        <div className="pagination-nav">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <span>
            Page{' '}<strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactListPage;