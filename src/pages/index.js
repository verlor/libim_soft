import * as React from 'react'
import Layout from '../components/Layout'
import ParameterFormular from '../components/ParameterFormular'
import '../styles/global.css'

// markup
const IndexPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">
        Input Parameters
      </h1>
      <ParameterFormular />
    </Layout>
  )
}

export default IndexPage
