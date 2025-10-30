import { Bell, LogOut, User, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LOGOUT } from "../actions/login-action/login-action"

const AppNavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Safely access Redux state with fallbacks
  const userMngmt = useSelector((state) => state?.app?.userMngmt || {})
  const user = userMngmt.user || null
  const notifications = userMngmt.notifications || []

  // Calculate unread count using useMemo to avoid recalculation on every render
  const unreadCount = useMemo(() => {
    if (!Array.isArray(notifications)) return 0
    return notifications.filter((n) => n && !n.is_read).length
  }, [notifications])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      // Close profile menu
      if (!e.target.closest(".profile-menu")) {
        setIsMenuOpen(false)
      }

      // Close notifications menu
      if (
        !e.target.closest(".notif-menu") &&
        !e.target.closest(".notif-button")
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("click", closeDropdown)
    return () => document.removeEventListener("click", closeDropdown)
  }, [])

  const handleLogout = () => {
    dispatch({ type: LOGOUT })
    navigate("/")
  }

  const handleToggleNotifications = (e) => {
    e.stopPropagation()
    setShowNotifications((prev) => !prev)
  }

  const handleMarkAllRead = (e) => {
    e.stopPropagation()
    // TODO: dispatch action to mark all as read on backend
    // dispatch(markAllNotificationsReadAction())
    console.log("Mark all as read")
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-lg md:text-2xl font-bold text-primary dark:text-white">
              Welcome to Credit Jambo
            </span>
          </div>

          {/* Right side - Notifications, User name, Profile menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications button */}
            <div className="relative notif-menu">
              <button
                onClick={handleToggleNotifications}
                className="notif-button relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Notifications (${unreadCount} unread)`}
                type="button"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full min-w-[18px]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification panel */}
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 sm:w-96 max-h-[70vh] overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Recent activities
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                        >
                          Mark all
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-auto max-h-[56vh]">
                    {!Array.isArray(notifications) ||
                    notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      <ul className="divide-y dark:divide-gray-700">
                        {notifications
                          .slice()
                          .sort(
                            (a, b) =>
                              new Date(b.created_at || 0) -
                              new Date(a.created_at || 0)
                          )
                          .map((n) => {
                            if (!n || !n.id) return null
                            const isUnread = !n.is_read
                            return (
                              <li
                                key={n.id}
                                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex gap-3 items-start"
                              >
                                <div
                                  className={`flex-shrink-0 mt-1 p-2 rounded ${
                                    isUnread
                                      ? "bg-indigo-50 dark:bg-indigo-900"
                                      : "bg-gray-100 dark:bg-gray-600"
                                  }`}
                                >
                                  {/* Icon by type */}
                                  {n.type === "withdraw" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v8m0 0l3-3m-3 3l-3-3"
                                      />
                                    </svg>
                                  ) : n.type === "deposit" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 16V8m0 0l3 3m-3-3l-3 3"
                                      />
                                    </svg>
                                  ) : (
                                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                      <div
                                        className={`text-sm font-medium truncate ${
                                          isUnread
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        {n.user_name || n.email || "User"}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                                        {n.message || "No message"}
                                      </div>
                                      {n.created_at && (
                                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                          {new Date(
                                            n.created_at
                                          ).toLocaleString()}
                                        </div>
                                      )}
                                    </div>
                                    {isUnread && (
                                      <div className="flex-shrink-0">
                                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          })}
                      </ul>
                    )}
                  </div>

                  <div className="p-3 border-t dark:border-gray-700 flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Showing {notifications.length} notification
                      {notifications.length !== 1 ? "s" : ""}
                    </div>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs px-3 py-1 rounded bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User name - hidden on mobile */}
            {user && (
              <span className="text-gray-700 dark:text-gray-300 hidden sm:inline font-medium">
                {user.name || user.email || "User"}
              </span>
            )}

            {/* Profile menu */}
            <div className="relative profile-menu">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                  {user && (
                    <div className="md:hidden px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                      {user.name || user.email || "User"}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNavBar
