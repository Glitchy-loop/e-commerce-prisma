"use client"

import { Toaster } from "react-hot-toast"

const ToastProvider = () => {
  return (
    <Toaster
    // toastOptions={{
    //   success: {
    //     iconTheme: {
    //       primary: "green",
    //       secondary: "black",
    //     },
    //     style: {
    //       background: "green",
    //     },
    //   },
    //   error: {
    //     style: {
    //       background: "red",
    //     },
    //   },
    // }}
    />
  )
}

export default ToastProvider
