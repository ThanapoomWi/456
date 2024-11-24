import React, { useState } from "react";
import logo from "/logo1.png";
import './Forgot.css'
import { useNavigate } from "react-router-dom";
function Forgot() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  return (
    <div className="login-container">

      <div className="login-box">
        <div className="login-header text-center">
          <img src={logo} alt="Logo" className="logo" />
          <h3 className="mt-3">SLIDE ME</h3>
          <p>กรุณากรอกอีเมลและรหัสผ่านของคุณเพื่อดำเนินการต่อ</p>
        </div>
        <form>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            เข้าสู่ระบบ
          </button>

          <button onClick={()=> navigate('/login')} type="submit" className="btn btn-dark w-100 mt-2">
            กลับ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
