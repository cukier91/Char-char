import React from 'react'

export default function Contact() {

    navigator.geolocation.getCurrentPosition(function(position){
        alert(position.coords.latitude)
    });

  return (
    <div>Contact</div>
  )
}
