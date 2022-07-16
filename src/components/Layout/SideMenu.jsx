import React from 'react'
import '../../styles/global.css'
import { Link, navigate } from 'gatsby'
import { stringify } from 'postcss'
import { useSelector, useDispatch } from 'react-redux'
import { setIsComplete } from '../Results/slice'

const activeStyle = { color: 'blue' }

export default function SideMenu() {
  const dispatch = useDispatch()
  const isComplete = useSelector((state) => state.results.isComplete)

  return (
    <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
          <li className="py-2 hover:bg-indigo-300 rounded">
            <div className="truncate" href="#">
              <Link to="/" activeStyle={activeStyle} exact="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:mx-2 mx-4 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>{' '}
                <span
                  id="home"
                  className="hidden sm:inline sm:text-sm sm:font-medium"
                >
                  Home
                </span>
              </Link>
            </div>
          </li>

          <li className="py-2 hover:bg-indigo-300 rounded">
            <div className="" href="#">
              <Link to="/managemats/" activeStyle={activeStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:mx-2 mx-4 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>{' '}
                <span className="hidden sm:inline sm:text-sm sm:font-medium ">
                  Manage Mats
                </span>
              </Link>
            </div>
          </li>
          <li className="py-2 hover:bg-indigo-300 rounded">
            <div className="" href="#">
              <Link to="/info/" activeStyle={activeStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:mx-2 mx-4 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{' '}
                <span className="hidden sm:inline sm:text-sm sm:font-medium">
                  Info & Defs
                </span>
              </Link>
            </div>
          </li>

          {isComplete && (
            <>
              <li className="py-2 hover:bg-indigo-300 rounded">
                <div className="" href="#">
                  <Link to="/results/" activeStyle={activeStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 sm:mx-2 mx-4 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>{' '}
                    <span className="hidden sm:inline text-sm font-medium">
                      Results
                    </span>
                  </Link>
                </div>
              </li>
              <li className="py-2 hover:bg-indigo-300 rounded">
                <div className="" href="#">
                  <Link
                    to="/"
                    activeStyle={activeStyle}
                    exact="true"
                    onClick={() => {
                      dispatch(setIsComplete(false))
                      navigate('/')
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 sm:mx-2 mx-4 inline "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>{' '}
                    <span className="hidden sm:inline text-sm font-medium">
                      Restart
                    </span>
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
