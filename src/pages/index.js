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
      <p className="py-2 text-xl">
        This single-page "app" style layout features a{' '}
        <span className="font-bold">sidebar</span>,{' '}
        <span className="font-bold">main</span>
        content area, and <span className="font-bold">footer</span>. This
        full-height layout is never more than viewport height. The content area
        scrolls independently as needed. For this example, we're using the{' '}
        <a className="text-indigo-600" href="https://tailwindcss.com/">
          Tailwind CSS
        </a>
        utility framework. As part of it's default classNamees, Tailwind
        includes Flexbox classNamees which make this layout implementation
        simple!
      </p>
      <p className="py-2 text-xl">
        Additionally, this layout is <span className="italic">responsive</span>.
        As screen width decreases down to 640px (the smallest Tailwind
        breakpoint), the layout stacks vertically. The sidebar orientation is
        flipped from vertical to horizontal (<code>flex-col sm:flex-row</code>),
        and the main content area fills the remaining height above the footer.
      </p>
    </Layout>
  )
}

export default IndexPage
