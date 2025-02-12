import { useState } from "react"
import Button from "./ui/Button"
import InputPassword from "./ui/InputPassword"
import InputText from "./ui/InputText"
import { Link } from "react-router-dom"

export default function SignupComponent(){
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onClick = () => {
  }

  return(
    <div className="w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
      <form className='backdrop-blur-md bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20'>
        <h2 className='text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 transform transition-all duration-500 hover:scale-105'>Create Account</h2>
        
        <div className='space-y-6 transform transition-all duration-300'>
          <div className='relative transform transition-all duration-300 hover:translate-x-1'>
            <InputText 
              label="Full Name" 
              placeholder="John Doe" 
              type="text" 
              setter={setName}
            />
          </div>

          <div className='relative transform transition-all duration-300 hover:translate-x-1'>
            <InputText 
              label="Contact Number" 
              placeholder="+1 (234) 567-8900" 
              type="tel" 
              setter={setNumber}
            />
          </div>

          <div className='relative transform transition-all duration-300 hover:translate-x-1'>
            <InputText 
              label="Email Address" 
              placeholder="you@example.com" 
              type="email" 
              setter={setEmail}
            />
          </div>
          
          <div className='relative transform transition-all duration-300 hover:translate-x-1'>
            <InputPassword 
              password={password} 
              setPassword={setPassword}
            />
          </div>

          <div className='flex items-center space-x-2 text-sm text-gray-300'>
            <input type="checkbox" className='w-4 h-4 rounded border-gray-400 text-purple-500 focus:ring-purple-500 cursor-pointer'/>
            <span className='group-hover:text-purple-400 transition-colors duration-200'>
              I agree to the{' '}
              <a href="#" className='text-purple-400 hover:text-purple-300 transition-colors duration-200'>Terms</a>
              {' '}and{' '}
              <a href="#" className='text-purple-400 hover:text-purple-300 transition-colors duration-200'>Privacy Policy</a>
            </span>
          </div>
        </div>

        <div className='mt-8 space-y-4'>
          <Button label="Create Account" onClick={onClick}/>
          
          <p className='text-center text-gray-300'>
            Already have an account?{' '}
            <Link to="/" className='text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium'>
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}