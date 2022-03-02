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
      <section class="page-header padding-tb">
        <div class="overlay"></div>
        <div class="container">
          <div class="page-header-content-area">
            <h4 class="ph-title">Login for Event</h4>
            <ul class="lab-ul">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a class="active">login</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div class="login-section padding-tb">
        <div class=" container">
          <div class="account-wrapper">
            <h3 class="title">Login</h3>

            <form class="account-form" onSubmit={onSubmit}>
              <div class="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div class="form-group">
                <div class="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div class="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label for="remember">Remember Me</label>
                  </div>
                  <a href="#">Forget Password?</a>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="d-block lab-btn">
                  <span>Submit Now</span>
                </button>
              </div>
            </form>
            <div class="account-bottom">
              <span class="d-block cate pt-10">
                Don’t Have any Account? <a href="/register"> Sign Up</a>
              </span>
              <span class="or">
                <span>or</span>
              </span>
              <h5 class="subtitle">Login With Social Media</h5>
              <ul class="social-media social-color lab-ul d-flex justify-content-center">
                <li>
                  <a href="#" class="facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" class="twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" class="linkedin">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#" class="instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" class="pinterest">
                    <i class="fab fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="heading">
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p> Login to your account </p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit} >

        <div className="form-group">
        <input type="email" 
        className="form-control" 
        id="email" name="email" value={email}
        placeholder='Enter your email' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="password" 
        className="form-control" 
        id="password" name="password" value={password}
        placeholder='Enter your password' onChange={onChange} />
        </div>

        <div className="form-groupe">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section> */}
    </>
  );
}

export default Login