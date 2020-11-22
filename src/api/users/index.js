import axios from 'axios'

const usersApi = axios.create({
  baseURL: 'http://www.filltext.com'
})

export const fetchUsers = async () => {
  const res = await usersApi.get('/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}')

  return res.data
}
