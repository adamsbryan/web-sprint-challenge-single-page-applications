import React from 'react'
import {Link} from "react-router-dom";


export default function HomePage() {

    return(
    <div>
        <h1>Lambda Eats!</h1>
        <Link to = "/pizza" >Create Your Pizza</Link>
    </div>
    )
}