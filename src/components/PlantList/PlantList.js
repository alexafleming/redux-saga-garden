import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';


function PlantList() {
    const dispatch = useDispatch();
    const plants = useSelector(store => store.plantList);

    const reduxState = useSelector(store => store);
    
    const getPlants = () => {
        axios.get('/api/plant').then(response => {
          dispatch({ type: 'ADD_PLANT', payload: response.data });
        })
          .catch(error => {
            console.log('error with adding plant', error);
          });
      }


    useEffect(() => {
        console.log('component did mount');
       getPlants()
    }, []); 

    const addPlant = () => {
        axios.post('/api/plant', { 
          name: newPlant
        })
          .then(() => {
            dispatch({ type: 'FETCH_PLANTS' })
            setNewPlant('');
          })
          .catch(error => {
            console.log('error with plant request', error);
          });
    
      }

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(plants)}</pre>
        </div>
    );
}

export default PlantList;
