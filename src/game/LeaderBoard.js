import React, { useState, useEffect } from "react";
import PlayerItem from "../components/PlayerItem";

const LeaderBoard = (props) => {

    const [players, setPlayers] = useState([]);

    const getPlayers = async() => {
        const tmp = await props.contract.playerCount();
        const playerCount = tmp.toNumber();
        let hold = []

        for(var i = 1; i <= playerCount; i++){
            const response = await props.contract.players(i);
            const uri = await props.contract.uri(i);
            let body = {
                id: i,
                attack: response.attack.toNumber(),
                hp: response.hp.toNumber(),
                status: response.status,
                wins: response.wins.toNumber(),
                image: uri
            };
            hold.push(body);
        };
        let sorted = hold.sort(
            (a,b) => (b.wins - a.wins)
        );

        setPlayers(sorted);
    }

    useEffect(() => {
        getPlayers()

    },[props.contract]);


    return (
        <div>
            this is the leader board
            <ul className="users-list">
                {players.map(nft => (
                    <PlayerItem 
                        id={nft.id} 
                        attack={nft.attack}
                        wins={nft.wins}
                        image={nft.image} 
                />
                ))}
            </ul>
        </div>
    )

};

export default LeaderBoard;