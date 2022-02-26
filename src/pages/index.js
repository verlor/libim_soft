import Layout from '../components/Layout'
import ParameterFormular from '../components/ParameterFormular/ParameterFormular'
import { decrement, increment } from '../components/testSlice'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/global.css'
import Resultados from '../components/Resultados'

// markup
const IndexPage = () => {
  const count = useSelector((state) => state.counter.value)
  const num_elec = useSelector((state) => state.parameter.num_electrodes)
  const dispatch = useDispatch()
  return (
    <Layout>
      <ParameterFormular />
      <Resultados />
    </Layout>
  )
}

export default IndexPage
