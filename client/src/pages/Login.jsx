import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => { 
    setFormData((prevSate) => ({
    ...prevSate, [e.target.name]: e.target.value,
  })) }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="page-header padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">Login for Event</h4>
            <ul className="lab-ul">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a className="active">login</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="login-section padding-tb">
        <div className=" container">
          <div className="account-wrapper">
            <h3 className="title">Login</h3>

            <form className="account-form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label for="remember">Remember Me</label>
                  </div>
                  <a href="#">Forget Password?</a>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="d-block lab-btn">
                  <span>Submit Now</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Don’t Have any Account? <a href="/register"> Sign Up</a>
              </span>
              <span className="or">
                <span>or</span>
              </span>
              <h5 className="subtitle">Login With Social Media</h5>
              <ul className="social-media social-color lab-ul d-flex justify-content-center">
                <li>
                  <a href="#" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="pinterest">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <section classNameName="heading">
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p> Login to your account </p>
    </section>
    <section classNameName="form">
      <form onSubmit={onSubmit} >

        <div classNameName="form-group">
        <input type="email" 
        classNameName="form-control" 
        id="email" name="email" value={email}
        placeholder='Enter your email' onChange={onChange} />
        </div>

        <div classNameName="form-group">
        <input type="password" 
        classNameName="form-control" 
        id="password" name="password" value={password}
        placeholder='Enter your password' onChange={onChange} />
        </div>

        <div classNameName="form-groupe">
          <button type="submit" classNameName="btn btn-block">Submit</button>
        </div>
      </form>
    </section> */}
    </>
  );
}

export default Login