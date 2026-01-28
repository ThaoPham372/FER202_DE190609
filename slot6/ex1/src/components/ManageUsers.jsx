import React from 'react'
import { ListOfUsers } from '../data/ListOfUsers'

function ManageUsers() {
  return (
    <div className="manage-layout">
      <main className="manage-main">
        {/* Top bar */}
        <div className="manage-topbar">
          <div>
            <h1 className="manage-page-title">Users</h1>
            <p className="manage-page-subtitle">
              Review, authorize, and manage enterprise user accounts.
            </p>
          </div>

          <div className="manage-topbar-actions">
            <button className="manage-btn-ghost">Export CSV</button>
            <button className="manage-btn-primary">Create User</button>
          </div>
        </div>

        {/* Filters */}
        <div className="manage-toolbar">
          <div className="manage-search">
            <span className="manage-search-icon">🔍</span>
            <input
              type="text"
              className="manage-search-input"
              placeholder="Search by name, email, or role..."
            />
          </div>
          <div className="manage-toolbar-right">
            <button className="manage-filter-btn">All Roles ▾</button>
            <button className="manage-filter-btn">All Status ▾</button>
          </div>
        </div>

        {/* Table */}
        <section className="manage-table-card">
          <table className="manage-table">
            <thead>
              <tr>
                <th className="manage-col-checkbox">
                  <input type="checkbox" />
                </th>
                <th className="manage-col-id">USER ID</th>
                <th className="manage-col-profile">USER PROFILE</th>
                <th className="manage-col-role">ACCESS ROLE</th>
                <th className="manage-col-status">STATUS</th>
                <th className="manage-col-password">PASSWORD</th>
                <th className="manage-col-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {ListOfUsers.map((user) => (
                <tr key={user.id} className="manage-row">
                  <td className="manage-col-checkbox">
                    <input type="checkbox" />
                  </td>
                  <td className="manage-col-id">
                    <span className="manage-id-code">#{user.id}</span>
                  </td>
                  <td className="manage-col-profile">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="manage-avatar"
                    />
                    <div className="manage-profile-text">
                      <div className="manage-profile-name">{user.name}</div>
                      <div className="manage-profile-email">{user.email}</div>
                    </div>
                  </td>
                  <td className="manage-col-role">
                    <span className="manage-role-pill">{user.role}</span>
                  </td>
                  <td className="manage-col-status">
                    <span
                      className={`manage-status-pill manage-status-${user.statusType}`}
                    >
                      <span className="manage-status-dot" /> {user.status}
                    </span>
                  </td>
                  <td className="manage-col-password">
                    <span className="manage-password-dots">••••••••</span>
                  </td>
                  <td className="manage-col-actions">
                    <button className="manage-action-link">Edit</button>
                    <span className="manage-action-separator">|</span>
                    <button className="manage-action-link manage-action-lock">
                      Lock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer pagination */}
          <footer className="manage-table-footer">
            <div className="manage-footer-text">
              SHOWING 1 - 5 OF {ListOfUsers.length} USERS
            </div>
            <div className="manage-pagination">
              <button className="manage-page-btn manage-page-btn-disabled">
                ‹
              </button>
              <button className="manage-page-btn manage-page-btn-active">
                1
              </button>
              <button className="manage-page-btn">2</button>
              <button className="manage-page-btn">3</button>
              <button className="manage-page-btn">…</button>
              <button className="manage-page-btn">9</button>
              <button className="manage-page-btn">›</button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default ManageUsers
