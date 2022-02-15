import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa"
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { firstName, lastName, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth )

useEffect(() => {
if ( isError) {
  toast.error(message)
}
if (isSuccess || user) {
  navigate('/')
}

dispatch(reset())

}, [ user, isError, isSuccess, message, navigate, dispatch ] )


  const onChange = (e) => { 
    setFormData((prevSate) => ({
    ...prevSate, [e.target.name]: e.target.value,
  })) }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match!')
    }else {
      const userData = {
       firstName, lastName, email, password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser/> Register
      </h1>
      <p> Please create an account </p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit} >
        <div className="form-group">
        <input type="text" 
        className="form-control" 
        id="firstName" name="firstName" value={firstName}
        placeholder='Enter your firstName' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="text" 
        className="form-control" 
        id="lastName" name="lastName" value={lastName}
        placeholder='Enter your lastName' onChange={onChange} />
        </div>

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

        <div className="form-group">
        <input type="password" 
        className="form-control" 
        id="password2" name="password2" value={password2}
        placeholder='Confirm password' onChange={onChange} />
        </div>

        <div className="form-groupe">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register