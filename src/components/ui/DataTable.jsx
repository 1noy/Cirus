import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon, FilterIcon, SearchIcon } from '@heroicons/react/outline';

/**
 * Composant DataTable professionnel avec fonctionnalités avancées
 * @component
 * @param {Object[]} data - Données à afficher
 * @param {Object[]} columns - Configuration des colonnes
 * @param {Function} onRowSelect - Callback lors de la sélection d'une ligne
 * @param {Function} onRowClick - Callback lors du clic sur une ligne
 * @param {boolean} selectable - Activer la sélection multiple
 * @param {boolean} searchable - Activer la recherche
 * @param {boolean} sortable - Activer le tri
 * @param {number} pageSize - Nombre d'éléments par page
 */
const DataTable = React.memo(({
  data = [],
  columns = [],
  onRowSelect,
  onRowClick,
  selectable = false,
  searchable = true,
  sortable = true,
  pageSize = 10,
  className = '',
  emptyMessage = 'Aucune donnée disponible',
  loading = false
}) => {
  // États locaux
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [expandedRows, setExpandedRows] = useState(new Set());
  
  // Refs
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);

  // Données filtrées et triées
  const filteredData = useMemo(() => {
    let result = [...data];

    // Filtrage par recherche
    if (searchTerm) {
      result = result.filter(item =>
        columns.some(col => {
          const value = col.accessor ? col.accessor(item) : item[col.key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Filtrage par colonnes
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => {
          const itemValue = item[key];
          if (typeof value === 'function') return value(itemValue);
          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, columns]);

  // Données triées
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = columns.find(col => col.key === sortConfig.key)?.accessor?.(a) ?? a[sortConfig.key];
      const bValue = columns.find(col => col.key === sortConfig.key)?.accessor?.(b) ?? b[sortConfig.key];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Gestionnaires d'événements
  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleRowSelect = useCallback((rowId, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onRowSelect?.(Array.from(newSelected));
  }, [selectedRows, onRowSelect]);

  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      const allIds = paginatedData.map(row => row.id);
      setSelectedRows(new Set(allIds));
      onRowSelect?.(allIds);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  }, [paginatedData, onRowSelect]);

  const handleRowClick = useCallback((row) => {
    onRowClick?.(row);
  }, [onRowClick]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const toggleRowExpansion = useCallback((rowId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Rendu des cellules
  const renderCell = useCallback((item, column) => {
    if (column.render) {
      return column.render(item, column);
    }

    const value = column.accessor ? column.accessor(item) : item[column.key];
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'boolean') {
      return value ? '✅' : '❌';
    }

    if (column.type === 'status') {
      const statusConfig = column.statusConfig?.[value] || {};
      return (
        <span className={`status-badge status-${value}`} style={statusConfig.style}>
          {statusConfig.label || value}
        </span>
      );
    }

    return value;
  }, []);

  // Composant de pagination
  const Pagination = () => (
    <div className="data-table__pagination">
      <div className="data-table__pagination-info">
        Affichage de {((currentPage - 1) * pageSize) + 1} à {Math.min(currentPage * pageSize, sortedData.length)} sur {sortedData.length} résultats
      </div>
      
      <div className="data-table__pagination-controls">
        <button
          className="data-table__pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          aria-label="Première page"
        >
          «
        </button>
        
        <button
          className="data-table__pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          aria-label="Page précédente"
        >
          ‹
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
          if (page > totalPages) return null;
          
          return (
            <button
              key={page}
              className={`data-table__pagination-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="data-table__pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          aria-label="Page suivante"
        >
          ›
        </button>
        
        <button
          className="data-table__pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
          aria-label="Dernière page"
        >
          »
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="data-table__loading">
        <div className="loading-spinner" />
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`} ref={tableRef}>
      {/* Barre d'outils */}
      <div className="data-table__toolbar">
        {searchable && (
          <div className="data-table__search">
            <SearchIcon className="data-table__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher... (Ctrl+F)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="data-table__search-input"
            />
          </div>
        )}

        {selectable && selectedRows.size > 0 && (
          <div className="data-table__selection-info">
            {selectedRows.size} élément(s) sélectionné(s)
          </div>
        )}

        <div className="data-table__actions">
          {Object.keys(filters).length > 0 && (
            <button
              onClick={() => setFilters({})}
              className="data-table__clear-filters"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="data-table__container">
        <table className="data-table__table">
          <thead className="data-table__header">
            <tr>
              {selectable && (
                <th className="data-table__header-cell data-table__checkbox-cell">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Sélectionner tout"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table__header-cell ${column.className || ''}`}
                  style={{ width: column.width }}
                >
                  <div className="data-table__header-content">
                    <span className="data-table__header-label">
                      {column.label}
                    </span>
                    
                    {sortable && column.sortable !== false && (
                      <button
                        className="data-table__sort-btn"
                        onClick={() => handleSort(column.key)}
                        aria-label={`Trier par ${column.label}`}
                      >
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon className="data-table__sort-icon active" />
                          ) : (
                            <ChevronDownIcon className="data-table__sort-icon active" />
                          )
                        ) : (
                          <ChevronDownIcon className="data-table__sort-icon" />
                        )}
                      </button>
                    )}

                    {column.filterable && (
                      <button
                        className="data-table__filter-btn"
                        onClick={() => {/* TODO: Implémenter le filtre */}}
                        aria-label={`Filtrer par ${column.label}`}
                      >
                        <FilterIcon className="data-table__filter-icon" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="data-table__body">
            <AnimatePresence>
              {paginatedData.map((item, index) => (
                <motion.tr
                  key={item.id || index}
                  className={`data-table__row ${selectedRows.has(item.id) ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleRowClick(item)}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  {selectable && (
                    <td className="data-table__cell data-table__checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.id)}
                        onChange={(e) => handleRowSelect(item.id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Sélectionner ${item.id}`}
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`data-table__cell ${column.className || ''}`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="data-table__empty">
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}
    </div>
  );
});

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    accessor: PropTypes.func,
    render: PropTypes.func,
    type: PropTypes.oneOf(['text', 'date', 'boolean', 'status']),
    sortable: PropTypes.bool,
    filterable: PropTypes.bool,
    width: PropTypes.string,
    className: PropTypes.string,
    statusConfig: PropTypes.object
  })).isRequired,
  onRowSelect: PropTypes.func,
  onRowClick: PropTypes.func,
  selectable: PropTypes.bool,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  pageSize: PropTypes.number,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool
};

DataTable.defaultProps = {
  selectable: false,
  searchable: true,
  sortable: true,
  pageSize: 10,
  className: '',
  emptyMessage: 'Aucune donnée disponible',
  loading: false
};

DataTable.displayName = 'DataTable';

export default DataTable;
