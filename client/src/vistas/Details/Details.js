import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getDetails, removeDetails } from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const details = useSelector(state => state.details)


    useEffect(() => {
        dispatch(getDetails(id));
        return () => {
            dispatch(removeDetails());
        }
    }, [dispatch, id]);

    // const clickHandler = () => {
    //     dispatch(removeDetails());
    // };

    // const deleteHandler = () => {
    //     if (details["createdInDB"]) {
    //         dispatch()
    //     }
    // };

    return (
        <div>
            <div>
                {!details.name ? <div>
                    <Loading />
                </div> : <div>
                    <div>
                        <img src={details.image} alt='poke details'></img>
                        <h3>{details.name}</h3>
                    </div>
                    <div>
                        {details.types.map(e => {
                            return (
                                <div
                                    key={e}>
                                    <span>{e.toUpperCase()}</span>
                                </div>
                            )
                        })}
                        {/* {details.types ? details?.types.map(type => <h2 key={type.name} id={type.name}>{type.name.toUpperCase()}</h2>) : null} */}
                        {/* <h3>{details[0].types.map(type => `${type.toUpperCase()}`)}</h3> */}
                    </div>
                    {/* <span >
                        {details.types?.map((t) => "  " + t.name + "  ")}
                    </span> */}
                    <div>
                        <h2>Hp: {details.hp}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.hp}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <h2>Attack: {details.attack}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.attack}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <h2>Defense: {details.defense}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.defense}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <h2>Speed: {details.speed}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.speed}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <h2>Height: {details.height}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.height}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <h2>Weight: {details.weight}</h2>
                        <meter
                            min='0'
                            max='200'
                            value={details.weight}
                            low='40'
                            high='150'
                            optimun='200'
                        ></meter>
                    </div>
                    <div>
                        <span>
                            <Link
                                to='/home'>Go back Home</Link>
                        </span>
                    </div>
                </div>
                }

            </div>
        </div>
    )
};