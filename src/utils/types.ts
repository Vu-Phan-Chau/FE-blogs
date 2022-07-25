export interface blogTypes {
  title: string,
  description: string,
  url: string,
  category: string,
  _id: string
}

export interface loginTypes {
  email: string,
  password: string
}

export interface registerTypes {
  fullName: string,
  email: string,
  password: string,
  phone: string,
  address: string
}

interface buttonObject {
  key: string,
  value: string
}

export interface modalTypes {
  title: string,
  message: string,
  buttons: Array<buttonObject>
}