import React from "react";
import "./Card.css";

const Card = (props) => (
  <img 
    onClick = {() => props.handleClick(props.letter)} 
    key = {props.letter} 
    src = {props.image}
    alt = {props.description}
  />
);

export default Card;