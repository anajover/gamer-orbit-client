import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { AuthContext } from '../../context/auth.context';
import { listCollectionsService } from '../../services/profile.services';

function Collections() {


  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const [gamesCollection, setGamesCollection] = useState([]);

  useEffect(() => {
    getGamesCollection()
  }, [])

  const getGamesCollection = async () => {
    try {
      const response = await listCollectionsService(user._id)
      setGamesCollection(response.data)
      console.log("Collections:", gamesCollection)
    } catch (error) {
      navigate("/error")
    }
  }

  if (gamesCollection === null) {
    return (
      <PulseLoader color= {"rgb(0,0,0"} />
    );
  };

  console.log("Contengo esto::", gamesCollection);

  
  return (
    <div>
    <h2>Status</h2>

    <h3>I own:</h3>
      {
        gamesCollection.map( (eachCollection) => {
          return (
            <div>
              <h4>{eachCollection.title}</h4>
              <h6>{eachCollection.state}</h6>
              <p></p>
            </div>
          )
        })
      }

    <h5>I'm playing:</h5>
    <h5>I've finished</h5>
    <h5>Wishlist</h5>

    </div>
  )
}

export default Collections