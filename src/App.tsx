import { About } from './components/About'
import { Booking } from './components/Booking'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { OpeningHours } from './components/OpeningHours'
import { Services } from './components/Services'
import { site } from './content'

export default function App() {
  return (
    <>
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-brass focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        {site.skipLabel}
      </a>
      <Header />
      <main id="innehall">
        <Hero />
        <Services />
        <Gallery />
        <About />
        <OpeningHours />
        <Location />
        <Contact />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
