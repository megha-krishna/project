import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function ViewReviews()
{
    //state to store reviews coming from backend
    const [reviews,setReviews]=useState([])
    //using axios call inside useffect to fecth while component load
    useEffect(()=>{
        axios.get('http://localhost:5000/reviews/all')
        .then(function (response) {
        console.log(response.data);
        setReviews(response.data)
        })
        .catch(function (error) {
         console.log(error);
             })
    },[])
    return(
        <>
        <div className="container">
        <h2 className="my-4">All Reviews</h2>
        <hr/>
        {reviews.length==0 && <h2 className='text-danger'>Failed to Fetch</h2>}
        <div className="row">
            {reviews.map((review) => (
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">Movie: {review.moviename}</h5>
                            <p className="card-text text-danger">Ratings: {review.movieratings}/5</p>
                            <Link to={`/review/${review.movieid}`} className="btn btn-primary mt-auto">Read Review</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center">
            <a className="btn btn-success mt-4" href="/addreview" >Post A Review</a>
        </div>
    </div>
        </>
    )
}

export default ViewReviews;