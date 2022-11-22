import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../redux/actions';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails());
    }, [dispatch, id]);

    return (
        <div>
            <div>
                <h4>

                </h4>
            </div>
        </div>
    )
};