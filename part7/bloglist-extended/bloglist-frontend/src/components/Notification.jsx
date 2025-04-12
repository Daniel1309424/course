const Notification = ({ message, type }) => {
    if (!message) return null;
  
    const notificationStyle = {
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid",
      borderRadius: "5px",
      backgroundColor: type === "error" ? "lightcoral" : "lightgreen",
      color: type === "error" ? "darkred" : "darkgreen",
    };
  
    return <div style={notificationStyle}>{message}</div>;
  };
  
  export default Notification;
  