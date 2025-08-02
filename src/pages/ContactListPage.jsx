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

// Keeping GlobalFilter here for simplicity, as it's only used on this page
const GlobalFilter = ({ filter, setFilter }) => (
    <div className="search-input-wrapper">
      <FaSearch />
      <input
        type="text"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
    </div>
);


const ContactListPage = () => {
  const data = useSelector((state) => state.contacts.data);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        header: 'Edit',
        id: 'edit',
        cell: ({ row }) => ( // <-- The cell now gets the row object
          // Link to the edit page with the contact's ID
          <Link to={`/contacts/edit/${row.original.id}`} className="edit-btn">
            <FaEdit size={18} />
          </Link>
        ),
        enableSorting: false,
      },
      { header: 'Contact Owner', accessorKey: 'contactOwner' },
      { header: 'Account Name', accessorKey: 'accountName' },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => <span className="name-cell">{info.getValue()}</span>,
      },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Phone', accessorKey: 'phone' },
      { header: 'Created Date', accessorKey: 'createdDate' },
      { header: 'Contact Source', accessorKey: 'contactSource' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
          <button onClick={downloadExcel} className="btn btn-green">
            Export
          </button>
          <Link to="/contacts/create" className="btn btn-blue">
            + Create
          </Link>
        </div>
      </header>

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
          Showing {table.getState().pagination.pageIndex * 10 + 1} to {table.getState().pagination.pageIndex * 10 + table.getRowModel().rows.length} of {data.length} entries
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