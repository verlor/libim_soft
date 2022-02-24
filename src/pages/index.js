import Layout from '../components/Layout'
import ParameterFormular from '../components/ParameterFormular/ParameterFormular'
import { decrement, increment } from '../components/testSlice'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/global.css'

// markup
const IndexPage = () => {
  const count = useSelector((state) => state.counter.value)
  const num_elec = useSelector((state) => state.parameter.num_electrodes)
  const dispatch = useDispatch()
  return (
    <Layout>
      <h2>{num_elec}</h2>
      <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">
        Input Parameters
      </h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <ParameterFormular />
    </Layout>
  )
}

export default IndexPage
