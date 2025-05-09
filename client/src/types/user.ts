export type UserType = {
  id: string // required, normalized version of _id
  _id?: string
  firstName: string
  lastName: string
  email: string
  country: string
  role: "client" | "artist"
  isVerified: boolean
  accessGranted: boolean
  signupDate: string
  isAdmin: boolean
  isActive: boolean
}
