import React, {useState,useEffect} from "react"
import axios from "axios"


const App =(props)=> {
    const [name,setName] = useState("")
    const [rating,setRating] = useState("")
    const [distance,setDistance] = useState("")
    const [price,setPrice] = useState("")
    const [cuisine,setCuisine] = useState("")
    const [restList,setResList] = useState([1])
    const [error,setError] = useState("")


    const handleSubmit = async() => {
        event.preventDefault();
        const returnedRestList=  (await axios.get("api/restaurants",{params:{name,rating,distance,price,cuisine}})).data
        setResList(returnedRestList)
    }

    useEffect(()=> {
        if (!restList.length){
            setError("There is no restaurant meets your criteria")
        }else{
            setError("")
        }
    },[restList])

    return <div>
        <form onSubmit={handleSubmit}>
            <div style={{flexDirection:"column",display:"flex",width:"30%",fontSize:"30px"}}>
                <label>Restaurant Name (case insensitive)</label>
                <input style={{height:"30px",fontSize:"20px"}} id="name" placeholder="Enter part or a restaurant's name" value = {name} onChange={(e)=>{
                    setName(e.target.value)
                }}></input>
                <label>Rating (1 start ~ 5 start)</label>
                <input style={{height:"30px",fontSize:"20px"}} id="rating" type="number" min = "1" max="5" step="1" placeholder="Pick a min rating" value = {rating} onChange={(e)=>{
                    setRating(e.target.value)
                }}></input>
                <label>Distance (1 miles ~ 10 miles)</label>
                <input style={{height:"30px",fontSize:"20px"}} id="distance" type="number" min = "1" max="10" step="1" placeholder="Pick a max distance" value = {distance} onChange={(e)=>{
                    setDistance(e.target.value)
                }}></input>
                <label>Price ($10 ~ $50)</label>
                <input style={{height:"30px",fontSize:"20px"}} id="price" type="number" min = "10" max="50" step="1" placeholder="Pick a max price" value = {price} onChange={(e)=>{
                    setPrice(e.target.value)
                }}></input>
                <label>Cuisine (case insensitive)</label>
                <input style={{height:"30px",fontSize:"20px"}} id="cuisine" placeholder="Enter part or a cuisine (case insensitive)" value = {cuisine} onChange={(e)=>{
                    setCuisine(e.target.value)
                }}></input>
            </div>
            <br />
            <button style={{height:"30px",fontSize:"20px"}} type="submit">Search</button>
        </form>
        <br />
        <div style={{flexDirection:"column",display:"flex",width:"100%",fontSize:"30px"}}>
            Restaurant List
            <div>{error}</div>
            {restList[0]!==1?restList.map((rest,ind)=>
                <ul key ={rest.id}>
                    <li>No {ind+1}</li>
                    <li>Name: {rest.name}</li>
                    <li>Distance: {rest.distance}</li>
                    <li>Customer Rating: {rest.customer_rating}</li>
                    <li>Price: {rest.price}</li>
                    <li>Cuisine: {rest.cuisine.name}</li>
                </ul>):null}
        </div>
    </div>
    }


export default App