export const taskAssignedTemplate = ({ name, userName, deadline }) => {
  return {
    subject: `📝 New Task Assigned: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4f46e5;">📝 New Task Assigned</h2>
        <p>Hi <strong>${userName}</strong>,</p>
        <p>You have been assigned a new task:</p>
        <table style="margin-top: 10px; margin-bottom: 15px;">
          <tr>
            <td><strong>Task:</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Deadline:</strong></td>
            <td>${new Date(deadline).toLocaleDateString("en-GB")}</td>
          </tr>
        </table>
        <p>Please login to the <a href="http://localhost:5173" style="color: #4f46e5;">Task Manager</a> to view more details.</p>
        <br />
        <p style="font-size: 14px; color: #555;">
          Regards,<br />
          <strong>Sahasrara Metatech Pvt,Ltd.</strong><br />
          Task Manager System
        </p>
        
      </div>
    `,
  };
};
