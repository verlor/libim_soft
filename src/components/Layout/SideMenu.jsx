import React from 'react'
import '../../styles/global.css'
import { Link } from 'gatsby'
import { stringify } from 'postcss'

const activeStyle = { color: 'blue' }

export default function SideMenu() {
  return (
    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="truncate" href="#">
              <Link to="/" activeStyle={activeStyle} exact="true">
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                  className="w-7 sm:mx-2 mx-4 inline"
                />
                <span id="home" className="hidden sm:inline">
                  Home
                </span>
              </Link>
              {/* console.log(window.location.href) */}
            </a>
          </li>
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="" href="#">
              <Link to="/results/" activeStyle={activeStyle}>
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg"
                  className="w-7 sm:mx-2 mx-4 inline"
                />{' '}
                <span className="hidden sm:inline">
                  {/* console.log(location) */}
                </span>
                Results
              </Link>
            </a>
          </li>
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="" href="#">
              <Link to="/managemats/" activeStyle={activeStyle}>
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/beaker.svg"
                  className="w-7 sm:mx-2 mx-4 inline"
                />{' '}
                <span className="hidden sm:inline">
                  {/* console.log(location) */}
                </span>
                Manage Mats
              </Link>
            </a>
          </li>
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="" href="#">
              <Link to="/info/" activeStyle={activeStyle}>
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/information-circle.svg"
                  className="w-7 sm:mx-2 mx-4 inline"
                />{' '}
                <span className="hidden sm:inline">
                  {/* console.log(location) */}
                </span>
                Info & Defs 
              </Link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

/*
<li className="py-2 hover:bg-indigo-300 rounded">
            <a className="truncate" href="#">
              <img
                src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg"
                className="w-7 sm:mx-2 mx-4 inline"
              />{' '}
              <span className="hidden sm:inline">Settings</span>
            </a>
          </li>
          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="" href="#">
              <img
                src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg"
                className="w-7 sm:mx-2 mx-4 inline"
              />{' '}
              <span className="hidden sm:inline">Products</span>
            </a>
          </li>

          <li className="py-2 hover:bg-indigo-300 rounded">
            <a className="" href="#">
              <img
                src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg"
                className="w-7 sm:mx-2 mx-4 inline"
              />{' '}
              <span className="hidden sm:inline">Integrations</span>
            </a>
          </li>



      <div className="bg-gray-50 rounded-xl border my-3 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-indigo-600 overflow-ellipsis">
              Made with Tailwind CSS!
            </span>
          </h2>
        </div>
      </div>

*/
