import React from 'react';
import gettingReady from 'C:/Users/brend/GIT/Henry/CursoHenry/PI/PI 2 2/PI-Pokemon-main/client/src/images/getting_ready.gif'

export default function Loading() {
    return (
        <div>
            <div>
                <img
                    src={gettingReady}
                    alt='poke loading'
                />
                <h2>Loading...</h2>
            </div>
        </div>
    )
};