import React from 'react'
import SlideBar from '../../Views/HomeView/SlideBar'
import Section from '../../Views/HomeView/Section'
import ContactPage from '../../Views/HomeView/ContactPage'
import AboutUs from '../../Views/HomeView/AboutUs'
import ChatBot from '../../Components/ChatBot/ChatBot'
 

export default function Home() {
  return (
    <>
    <SlideBar />
    <ChatBot />
    <Section />
    <ContactPage />
    <AboutUs />
    </>
  )
}
