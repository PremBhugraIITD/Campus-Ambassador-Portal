import React, { useContext, useEffect, useRef, useState } from 'react';
import './Leaderboard.css'
import Ranking from '../../components/Ranking/Ranking';
import { capContext } from '../../store/store';
import { showLeaderboard } from '../../store/apiHandler';

const Leaderboard = () => {
  const { users, userPersonal } = useContext(capContext);
  const [isUser, setIsUser] = useState(false);
  const [myRank, setMyRank] = useState(null);
  const [rankedList, setRankedList] = useState([]);
  const takeToMyRank = useRef(null);

  useEffect(()=>{
    showLeaderboard().then((data) => {
      setRankedList(data);
    })  

  },[])

  // useEffect(() => {
  //   const myRankIndex = rankedList.findIndex(user => user?.user_id === userPersonal?.user_id);
  //   setMyRank(myRankIndex + 1);

  //   if (myRankIndex !== -1 && myRankIndex < 15) {
  //     setIsUser(true);
  //   } else {
  //     setIsUser(false);
  //   }
  //   // if (takeToMyRank.current) {4

  //   //   takeToMyRank.current.scrollIntoView({ behavior: 'smooth' });
  //   // }
  // }, [rankedList, userPersonal?.user_id]);

  const topRankList = rankedList?.slice(0, 20);

 

  return (
    <div  className='outer-leaderboard-container'>
      <div>
        <h1>Leaderboard</h1>
      </div>
      <div className='all-ranking'>
        {
          topRankList?.map((user, index) => {
            if(index === myRank-1){
              return (
              <div ref={takeToMyRank} className='my-rank'>
              <Ranking user={user} key={user?.ca_id} rank={index + 1} display={true}/>
              </div>
              )
            }
            else {
              return <Ranking user={user} key={user?.ca_id} rank={index + 1} display={false}/>
            }
            
          })
        }

        {
          !isUser && myRank !== null && (
            <div ref={takeToMyRank} className='my-rank'>
              <Ranking user={userPersonal} key={userPersonal?.ca_id} rank={myRank} display = {true}/>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Leaderboard;

