'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function dashboardLayout({ children , params,}) {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  axios.defaults.withCredentials = true
  useEffect(() => {
    (async () => {
      const {user, error} = await check()
      if(error){
        router.push('/login')
        return
      }
      if(user.has_profile){
        router.push('/dashboard')
        return
      }
      setSuccess(true)
    })()
  }, [router])

  const check = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/auth/verify')
      // console.log(data)
      return{
        user: data,
        error: null
      }
    } catch (err) {

      return{
        user: null,
        error: err.message
      }
    }
  }

  if(!success){
    return <></>
  }
  return (<main>
    {children}
  </main>)
}