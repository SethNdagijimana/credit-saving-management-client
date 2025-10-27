import Notification from "../models/Notification.js"

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getByUser(req.user.id)
    res.json({ notifications })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const markRead = async (req, res) => {
  try {
    const userId = req.user.id
    await Notification.markAllRead(userId)
    res.json({ message: "Notifications marked as read" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
