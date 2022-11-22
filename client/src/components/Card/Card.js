import React from 'react';
import { Link } from 'react-router-dom';


export default function Card({ id, name, image, types }) {
    return (
        <div>
            {/* <h4>#{id}</h4> */}
            <Link
                to={`pokemons/${id}`}>
                <img src={image} alt='poke image' />
            </Link>
            {/* <img src={image} alt='imagen 1' /> */}
            <h2>{name.toUpperCase()}</h2>
            <div>{types.map(e => {
                return (
                    <div
                        key={e}>
                        <span>{e.toUpperCase()}</span>
                    </div>
                )
            })}</div>
        </div>

        // <div>
        //     <div>
        //         <Link
        //             to={`pokemons/${id}`}>
        //             <img src={image} alt='poke image' />
        //         </Link>
        //     </div>
        //     <div>
        //         <h3>{name}</h3>
        //         <p>{types.map(t => ' ' + t.name + ' ')}</p>
        //     </div>
        // </div>
    )
};