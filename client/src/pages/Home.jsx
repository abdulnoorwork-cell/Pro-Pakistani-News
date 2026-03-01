import React from 'react'
import Main from '../components/Main'
import LatestNews from '../components/LatestNews'
import TechPost from '../components/TechPost'
import ThreeCategorySection from '../components/ThreeCategorySection'
import PakInternationalNews from '../components/PakInternationalNews'
import EducationNews from '../components/EducationNews'
import HealthPost from '../components/HealthPost'

const Home = () => {
  return (
    <div>
      <Main />
      <LatestNews />
      <TechPost />
      <ThreeCategorySection />
      <EducationNews />
      <PakInternationalNews />
      <HealthPost />
    </div>
  )
}

export default Home