import React, { useState } from 'react';
import Picture from "../../assets/Images/LoginPageImg.png"
import {useNavigate} from 'react-router-dom';
import {useUser} from "../../Components/UserContext/UserContext";

interface SignInFormData {
  login: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    login: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchUserStatus } = useUser();

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringToSend = JSON.stringify(formData);
    try {
        const response = await fetch('https://localhost:7028/api/Users/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: stringToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
      await fetchUserStatus();
      navigate('/User/List');

    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign-In</h3>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="login"
                    placeholder="Enter Worker's username"
                    value={formData.login}
                    onChange={handleChange}
                  />
                  <label className="form-label">Login</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Enter Worker's password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label className="form-label">Password</label>
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                </div>
                {error && <span className="text-danger">{error}</span>}
                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="mailto:adminOfSeriosInc@autovade.com">Forgot password?</a></p>
                <p>Don't have an account? <a href="mailto:adminOfSeriosInc@autovade.com" className="link-info">Ask an Admin to make you one!</a></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={Picture} alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
