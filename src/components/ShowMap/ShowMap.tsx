import style from './ShowMap.module.css';
import React, { useState } from 'react'
import { Map, Marker, ZoomControl} from 'pigeon-maps';


export function ShowMap(props: {location: Array<[number, number]>}) {

    const[locations, setLocations] = useState(props.location)

  return (
    <div className={style.container}>
					<Map
						height={400}
						width={700}
						defaultCenter={locations?[0,0]:locations}
						defaultZoom={11}
					>
						<ZoomControl />
						<Marker
							width={50}
							anchor={locations?[0,0]:locations}
							color={'#E54F6D'}
							
						/>			
					</Map>
					<div>Box na dane po kliknieciu</div>
				</div>
  )
}
