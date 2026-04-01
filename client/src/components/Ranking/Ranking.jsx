import React, { useContext, useEffect, useState } from 'react';
import './Ranking.css';
import trophy from './../../assets/dark/Trophy.svg';
import top_medal from '../../assets/dark/top_medal.svg';
import medal from '../../assets/dark/medal.svg';
import up_logo from '../../assets/dark/Vectorup.svg';
import upblcak_logo from '../../assets/dark/Vectorup.svg';
import user_image from '../../assets/user_image.png';
import { imagesContext } from '../../store/images';

const Ranking = ({user, rank, display}) => {
    const {imageTheme} = useContext(imagesContext);
    const [medalImage, setMedalImage] = useState(trophy);
    const [style, setStyle] = useState({

    })
    // console.log(display)
   
    const image_style ={
        width: "40px",
        height: "40px",
        border: "1px solid black",
        borderRadius: "100%",
        padding: "5px",
        marginRight: "15px",

    }

    // const rank = rank+1;
    useEffect(
    () => {
        // console.log(rank)
        if(rank>3){
            setMedalImage(imageTheme.medal);
            setStyle(
                {
                    backgroundColor: "var(--primary-color)",
                    width: "fit-content",
                    padding: "0px 10px"  
                })
        }
        else if(rank === 3){
            setMedalImage(imageTheme.top_medal);
            setStyle(
                {
                    backgroundColor: "#AE6F53",
                    width: "fit-content",
                    padding: "0px 10px"

                })
        }

        else if(rank === 2){
            setMedalImage(imageTheme.top_medal);
            setStyle(
                {
                    backgroundColor: "#828282",
                    width: "fit-content",
                    padding: "0px 10px"


                })
        }
        
        else if(rank === 1){
            setMedalImage(imageTheme.trophy);
            setStyle(
                {
                    backgroundColor: "#D1B900",
                    width: "fit-content",
                    padding: "5px 12px"

                })
        }
        // console.log("oh no")
    },
    [imageTheme])
  return (
    <div  className='outer-ranking-container'>
      <div className='inner-ranking-container'>
        <div style={style} className='position'>
            <p id='rank' >{rank}</p>
            <img className='trophy-image' src={medalImage} alt="" />
            {
                
            }
            <img className='uplogo-img' src={rank >3 ? imageTheme.upblcak_logo : imageTheme.up_logo} alt="" />
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
            {
                display? <img style={image_style} src={user_image} alt="" />: <></>
            }
            <p>{`${user?.ca_id}/${user?.name}`}</p>
        </div>
        <div className='user-points'>
            <p>{user?.user_credit}</p>
        </div>
      </div>
      {
        display? <hr style={{border:"1px solid var(--secondary-color)"}} /> : <hr />
      }
    </div>
  );
}

export default Ranking;
