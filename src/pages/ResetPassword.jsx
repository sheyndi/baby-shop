import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      setMessage('הסיסמה שונתה בהצלחה');
    } catch (err) {
      setMessage('הקישור לא תקף או שהתרחשה שגיאה');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>איפוס סיסמה</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>סיסמה חדשה:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '12px' }}>
          אפס סיסמה
        </button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default ResetPassword;
