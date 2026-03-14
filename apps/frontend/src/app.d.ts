declare global {
  namespace App {
    interface Locals {
      token?: string
    }
    interface PageData {}
    interface Error {
      message: string
      code?: string
    }
    interface Platform {}
  }
}

export {}
