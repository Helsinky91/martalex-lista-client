import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPasswordService } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate()

  const handleResetPassword = async () => {
    try {
      await resetPasswordService(token, newPassword);
      navigate("/login")
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
