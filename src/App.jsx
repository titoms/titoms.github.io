import { BrowserRouter } from 'react-router-dom'
import { Header, Hero, Contact, Who, Works, Experience, Projects, Stars, TechSkills } from './components'

const App = () => {
  return (
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Header />
            <Hero />
          </div>
          <Who />
          <TechSkills />
          <Experience />
          <Projects />
          {/*<Works />*/}
        </div>
        <div className="relative z-0">
          <Contact />
          <Stars />
        </div>
      </BrowserRouter>
  )
}

export default App
