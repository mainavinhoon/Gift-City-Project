import Map from '@/components/Map/Map'
import UserProfile from '@/components/UserData/UserProfile'
import Events from '@/components/events/Events'
import Introduction from '@/components/introduction/Introduction'

import React from 'react'

const HomePage = () => {
  return (
    <div>
      {/* <UserProfile/> */}
      <Introduction/>
      
      <Events/>
      <Map/>
    </div>
  )
}

export default HomePage