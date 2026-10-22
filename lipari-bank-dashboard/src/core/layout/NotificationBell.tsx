import { useEffect, useState } from "react";

interface Notification {
  id: string;
  text: string;
  read: boolean;
}

export default function NotificationBell(props: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dropdown toggleabile (forma funzionale setIsOpen(prev => !prev))
  // e.stopPropagation() sull'onClick della campanella

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const notifications = setTimeout(() => {
      setNotifications([
        { id: "1", text: "Nuova transazione sul tuo conto", read: false },
        { id: "2", text: "Il tuo saldo è basso", read: false },
        { id: "3", text: "Promozione speciale per te", read: true },
      ]);

      return () => clearTimeout(notifications); // cleanup
    }, 1000);
  }, [props.userId]);
  return (
    <div className="notification-container">
      <button
        type="button"
        className="notification-bell"
        aria-label={`Notifiche: ${unreadCount} non lette`}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <h3>Notifiche</h3>

          {isLoading ? (
            <p>Caricamento notifiche...</p>
          ) : notifications.length === 0 ? (
            <p>Nessuna notifica.</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={notification.read ? "read" : "unread"}
                >
                  {notification.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
