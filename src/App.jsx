import { BrowserRouter } from 'react-router-dom'
import { Header, Hero, Contact, Who, Works, Experience, StarCanvas } from './components'

function App() {
  return (
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Header />
            <Hero />
          </div>
          <Who />
          <Experience />
          <Works />
        </div>
        <div className="relative z-0">
          <Contact />
          <StarCanvas />
        </div>
      </BrowserRouter>
  )
}

export default App
