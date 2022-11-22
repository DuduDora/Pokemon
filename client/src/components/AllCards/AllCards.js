import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import { removeDetails, restaurar, } from '../../redux/actions';

export default function Cards() {
    const dispatch = useDispatch();
    const historia = useHistory();
    const allPokemons = useSelector(state => state.allPokemons);
    const addedPokemons = useSelector(state => state.addedPokemons);

    const [loadedPokemons] = useState(allPokemons.length ? true : false);
    useEffect(() => {
        dispatch(removeDetails());
        dispatch(restaurar())

    }, [loadedPokemons, dispatch])

    return (
        <div>
            <div>
                {
                    addedPokemons.length > 0 ? (addedPokemons.map(p => {
                        <div>
                            <div>
                                <h4>#{p.id}</h4>
                                <h2> {p.name.toUpperCase()}</h2>
                                <img src={p.image} alt='image 2' />
                            </div>
                        </div>
                    })) : <h2>No hay nada</h2>
                }
            </div>
        </div>
    )

};


