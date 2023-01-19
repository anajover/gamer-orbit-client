import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { listGamesDetailsService } from '../services/games.services'

function GameComp(props) {
    const [gameDetails, setGameDetails] = useState(null)
    const [gameProps, setGameProps] = useState(props.data)

    const navigate = useNavigate()


    useEffect(() => {
      getDataFromApi()
    }, [])

    // -----------> console.log("Game Props:", gameProps);

    const getDataFromApi = async () => {
        try {
            const response = await listGamesDetailsService(gameProps.gameApiId)
            setGameDetails(response.data)
            // -----------> console.log("Response data de setGameDetails:",response.data);
        } catch (error) {
            navigate("/error")
        }
    }
    
    if (gameDetails === null || gameDetails === undefined || gameDetails.length === 0 || !gameDetails) {
        return (
          <div>
              <h4>Loading...</h4>
              <PulseLoader color={"rgb(0,0,0)"} />
          </div>
        )
    }

    return (
        <div>
            <h3><Link to={`/videogames/${gameDetails.id}/details`}>{gameDetails.name}</Link></h3>
            <p>General rating: <strong>{gameDetails.rating}</strong></p>
            <p>Main genre: <strong>{gameDetails.genres[0].name}</strong></p>
            <p>Released: <strong>{gameDetails.released}</strong></p>
            <img src={gameDetails.background_image} width={250} alt="" />    
        </div>       
        )

}

export default GameComp