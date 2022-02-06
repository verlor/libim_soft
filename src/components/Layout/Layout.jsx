import React from 'react'
import SideMenu from './SideMenu'
import Footer from './Footer'
import '../../styles/global.css'

export default function Layout({ children }) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <SideMenu />
        <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
