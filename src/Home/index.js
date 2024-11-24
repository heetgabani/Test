import React, { useState } from 'react';
import logo from '../Assets/HPPL.svg';

const Index = () => {
    const teamNames = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F", "Team G", "Team H"];

    const teams = {
        "Team A": [
            { name: "Player 1", age: 25, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 2", age: 28, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team B": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team C": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team D": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team E": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team F": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team G": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
        "Team H": [
            { name: "Player 4", age: 30, type: "Batsman", hand: "Right-Handed", photo: "https://via.placeholder.com/150" },
            { name: "Player 5", age: 26, type: "All-Rounder", hand: "Left-Handed", photo: "https://via.placeholder.com/150" },
        ],
    };

    const [selectedTeam, setSelectedTeam] = useState("Team A");
    const [selectedPlayer, setSelectedPlayer] = useState(teams["Team A"][0]);
    const [playerAmount, setPlayerAmount] = useState('');
    const [playerStatus, setPlayerStatus] = useState('');
    const [assignedTeam, setAssignedTeam] = useState('');


    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        setSelectedPlayer(teams[team][0]);
    };

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };
    const handleAmountChange = (event) => {
        setPlayerAmount(event.target.value);
    };

    const handleSold = () => {
        setPlayerStatus('Sold');
    };

    const handleUnsold = () => {
        setPlayerStatus('Unsold');
    };
    const handleAssignedTeamChange = (event) => {
        setAssignedTeam(event.target.value);
    };

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh', backgroundColor: '#fff' }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{ height: '100%', maxHeight: '100%' }}
                />
            </header>

            <div style={{ display: 'flex', height: '85vh' }}>
                {/* Team Names Table */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <h2 style={{ textAlign: 'left' }}>Team Names</h2>
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: '80%',
                            border: '1px solid #ddd',
                            textAlign: 'left',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#f4f4f4' }}>
                                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Team Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamNames.map((team, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleTeamClick(team)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedTeam === team ? '#e0f7fa' : 'transparent',
                                    }}
                                >
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{team}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Player Info */}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <h2>Players in {selectedTeam}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {teams[selectedTeam].map((player, index) => (
                            <div
                                key={index}
                                onClick={() => handlePlayerClick(player)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: selectedPlayer === player ? '#d1c4e9' : '#fff',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                }}
                            >
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <h2>Player Info</h2>
                    {selectedPlayer && (
                        <>
                            <img
                                src={selectedPlayer.photo}
                                alt={selectedPlayer.name}
                                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }}
                            />
                            <h3>{selectedPlayer.name} ({selectedPlayer.age})</h3>
                            <p>Type: {selectedPlayer.type}</p>
                            <p>Batting/Bowling: {selectedPlayer.hand}</p>
                        </>
                    )}
                    <div style={{ marginTop: '10px', width: '100%', maxWidth: '200px' }}>
                        <select
                            value={assignedTeam}
                            onChange={handleAssignedTeamChange}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                            }}
                        >
                            <option value="" disabled>Select Team</option>
                            {teamNames.map((team, index) => (
                                <option key={index} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount Input */}
                    <div style={{ marginTop: '20px' }}>
                        <input
                            type="number"
                            placeholder="Enter Player Amount"
                            value={playerAmount}
                            onChange={handleAmountChange}
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                width: '100%',
                                maxWidth: '200px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                            }}
                        />
                    </div>


                    <div style={{ marginTop: '10px' }}>
                        <button
                            onClick={handleSold}
                            style={{
                                marginRight: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Sold
                        </button>
                        <button
                            onClick={handleUnsold}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Unsold
                        </button>
                    </div>

                    {playerStatus && (
                        <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                            Status: {playerStatus}
                        </p>
                    )}

                    <button
                        // onClick={getRandomPlayer}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Get Player
                    </button>
                    {playerStatus && (
                        <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                            Status: {playerStatus}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
