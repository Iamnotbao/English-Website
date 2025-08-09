

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

type HalfRatingProps ={
    rating : number
}

export default function HalfRating({rating}: HalfRatingProps){
    return (
        <Stack spacing={1}>
            <Rating name= "half-rating" defaultValue={rating} precision={0.5} readOnly/>
        </Stack>
    )
}