import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '-'
  if (Array.isArray(value)) return value.map(displayValue).join(', ')
  if (typeof value === 'object') {
    return value.name || value.username || value.title || value.email || JSON.stringify(value)
  }
  return String(value)
}

function ResourcePage({ title, eyebrow, description, resource, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')
      try {
        setRecords(await fetchCollection(resource, { signal: controller.signal }))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [resource])

  return (
    <section aria-labelledby={`${resource}-heading`}>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">{eyebrow}</p>
          <h1 id={`${resource}-heading`}>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        {!loading && !error && <span className="record-count">{records.length} records</span>}
      </div>

      <div className="data-surface">
        {loading ? (
          <div className="loading-state" role="status">
            <span className="spinner-border" aria-hidden="true" /> Loading {title.toLowerCase()}...
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">{error}</div>
        ) : records.length === 0 ? (
          <div className="empty-state">
            <strong>No {title.toLowerCase()} yet</strong>
            <span>New records will appear here when they are available.</span>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table data-table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record.id ?? record._id ?? `${resource}-${index}`}>
                    {columns.map((column, columnIndex) => (
                      <td
                        className={columnIndex === 0 ? 'table-primary-cell' : 'table-muted-cell'}
                        key={column.label}
                      >
                        {displayValue(column.value(record, index))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourcePage