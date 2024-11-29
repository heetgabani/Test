import React, { useEffect, useState } from "react";

interface Team {
    id: number;
    name: string;
    logo: string | null;
    usedBalance: number;
    remainingBalance: number;
    totalBalance: number;
    players: any;
}
interface Player {
    playerName: string;
    playerId: number;
    type: string;
    selfie: string;
    age: number;
}
const Auction = () => {
    const [selectedPlayer, setSelectedPlayer] = useState < Player | null > (null);
    const [playerStatus, setPlayerStatus] = useState("");
    const [assignedTeam, setAssignedTeam] = useState("");
    // const [teams, setTeams] = useState<Team[]>([]);
    const [teamNames, setTeamNames] = useState < Team[] > ([]);
    const [selectedTeam, setSelectedTeam] = useState < Team | null > (null);
    const [playerAmount, setPlayerAmount] = useState < number | "" > ("");
    const [selectedTeamId, setSelectedTeamId] = useState < number | null > (null);
    const [openTeamId, setOpenTeamId] = useState(null);
    const [teamPlayers, setTeamPlayers] = useState < Record < number, Player[]>> ({});

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    "https://api-fortuna.fortuna.so/api/v1/players/teams",
                    {
                        headers: {
                            "sec-ch-ua-platform": "macOS",
                            Referer: "https://meeting.fortuna.so/",
                            "User-Agent":
                                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                            Accept: "application/json, text/plain, */*",
                            "sec-ch-ua":
                                '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                            "sec-ch-ua-mobile": "?0",
                        },
                    }
                );
                const data = await response.json();
                setTeamNames(data.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);
    const fetchPlayerDetails = async () => {
        try {
            const response = await fetch(
                "https://api-fortuna.fortuna.so/api/v1/players/details",
                {
                    headers: {
                        "sec-ch-ua-platform": "macOS",
                        Referer: "https://meeting.fortuna.so/",
                        "User-Agent":
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                        Accept: "application/json, text/plain, */*",
                        "sec-ch-ua":
                            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch player details");
            }

            const result = await response.json();

            if (result?.data) {
                setSelectedPlayer({
                    playerName: result.data.playerName,
                    playerId: result.data.playerId,
                    type: result.data.type,
                    selfie: result.data.selfie,
                    age: result.data.age,
                });
            }
        } catch (error) {
            console.error("Error fetching player details:", error);
            setSelectedPlayer(null);
        }
    };

    // const handleTeamClick = (team: Team) => {
    //   setSelectedTeam(team);
    // };

    // const handlePlayerClick = (player) => {
    //   setSelectedPlayer(player);
    // };
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === "" || (/^\d+$/.test(value) && +value >= 1 && +value <= 89)) {
            setPlayerAmount(value === "" ? "" : +value);
        }
    };

    // const handleSold = () => {
    //   setPlayerStatus("Sold");
    // };

    const handleUnsold = async () => {
        if (!selectedPlayer || !selectedPlayer.playerId) {
            alert("Player is not selected!");
            return;
        }

        try {
            const response = await fetch(
                `https://api-fortuna.fortuna.so/api/v1/players/unsold?playerId=${selectedPlayer.playerId}`,
                {
                    method: "PUT",
                    headers: {
                        "sec-ch-ua-platform": "macOS",
                        Referer: "https://meeting.fortuna.so/",
                        "User-Agent":
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                        Accept: "application/json, text/plain, */*",
                        "sec-ch-ua":
                            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                    },
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Player marked as unsold successfully!");
                console.log("Unsold response:", result);
            } else {
                alert(`Failed to mark player as unsold: ${result.message}`);
            }
        } catch (error) {
            console.error("Error marking player as unsold:", error);
        }
    };

    const handleAssignedTeamChange = (event) => {
        setAssignedTeam(event.target.value);
    };
    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamId(Number(event.target.value));
    };

    const handleSold = async () => {
        if (!selectedPlayer || !selectedTeamId || !playerAmount) {
            alert("Player, Team, or Amount is missing!");
            return;
        }

        try {
            const response = await fetch(
                "https://api-fortuna.fortuna.so/api/v1/players/auction",
                {
                    method: "POST",
                    headers: {
                        "sec-ch-ua-platform": "macOS",
                        Referer: "https://meeting.fortuna.so/",
                        "User-Agent":
                            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                        Accept: "application/json, text/plain, */*",
                        "sec-ch-ua":
                            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                        "sec-ch-ua-mobile": "?0",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        playerId: selectedPlayer.playerId,
                        teamId: selectedTeamId,
                        playerAmount: playerAmount,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Player sold successfully!");
                console.log("Sold response:", result);
            } else {
                alert(`Failed to sell player: ${result.message}`);
            }
        } catch (error) {
            console.error("Error selling player:", error);
        }
    };

    const fetchPlayers = async (teamId: number): Promise<Player[]> => {
        try {
            const response = await fetch(
                `https://api-fortuna.fortuna.so/api/v1/players/team?teamId=${teamId}`
            );
            const data = await response.json();
            return data.data.players || [];
        } catch (error) {
            console.error("Failed to fetch players:", error);
            return [];
        }
    };

    const toggleDropdown = async (team) => {
        if (openTeamId === team.id) {
            // Close dropdown if already open
            setOpenTeamId(null);
        } else {
            setOpenTeamId(team.id); // Set dropdown as open
            const players = await fetchPlayers(team.id); // Always fetch players
            setTeamPlayers((prev) => ({ ...prev, [team.id]: players }));
        }
    };

    return (
        <>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "15vh",

                    backgroundColor: "#fff",
                    // padding: "20px",
                }}
            >
                <div>
                    <img
                        src="https://d3kurm9hxzkbh1.cloudfront.net/HPPL.svg"
                        alt="Logo"
                        style={{ height: "125px", maxHeight: "100%" }}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <h1
                        style={{
                            fontWeight: "bolder",
                            fontSize: "30px",
                            height: "40%",
                            fontFamily: "-moz-initial",
                        }}
                    >
                        HADMATIYA PATIDAR PREMIER LEAGUE AUCTION
                    </h1>
                </div>
            </header>

            <div
                style={{ display: "flex", height: "85vh", fontFamily: "sans-serif" }}
            >
                <div style={{ flex: 1, padding: "20px" }}>
                    {/* <h2
            style={{
              textAlign: "left",
              fontWeight: "bolder",
              fontSize: "24px",
            }}
          >
            Team Names
          </h2> */}
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "80%",
                            border: "1px solid #ddd",
                            textAlign: "left",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f4f4f4" }}>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    Team Logo
                                </th>
                                <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                                    Team Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamNames.map((team) => (
                                <React.Fragment key={team.id}>
                                    <tr
                                        onClick={() => toggleDropdown(team)}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor:
                                                openTeamId === team.id ? "#e0f7fa" : "transparent",
                                        }}
                                    >
                                        <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                            {team.logo ? (
                                                <img
                                                    src={team.logo}
                                                    alt={team.name}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                            ) : (
                                                <span>No Logo</span>
                                            )}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <div>{team.name}</div>
                                                <div style={{ display: "flex", gap: "5px" }}>
                                                    {" "}
                                                    <h3 style={{ color: "grey" }}>
                                                        Remaining Balance :{" "}
                                                    </h3>
                                                    <h3 style={{}}> {team.remainingBalance}</h3>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {openTeamId === team.id && (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                style={{
                                                    border: "1px solid #ddd",
                                                    padding: "10px",
                                                    backgroundColor: "#f9f9f9",
                                                }}
                                            >
                                                {teamPlayers[team.id] ? (
                                                    <ul
                                                        style={{
                                                            margin: 0,
                                                            padding: "0 15px",
                                                        }}
                                                    >
                                                        {teamPlayers[team.id].map((player) => (
                                                            <li
                                                                key={player.playerId}
                                                                style={{
                                                                    margin: "5px 0",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <img
                                                                    src={player.selfie}
                                                                    alt={player.playerName}
                                                                    style={{
                                                                        width: "30px",
                                                                        height: "30px",
                                                                        borderRadius: "50%",
                                                                        marginRight: "10px",
                                                                    }}
                                                                />
                                                                {player.playerName} - {player.type}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>Loading players...</p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <div style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
          <h2>Players in {selectedTeam}</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {teams[selectedTeam].map((player, index) => (
              <div
                key={index}
                onClick={() => handlePlayerClick(player)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPlayer === player ? "#d1c4e9" : "#fff",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={player.photo}
                  alt={player.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{player.name}</span>
              </div>
            ))}
          </div>
        </div> */}

                <div
                    style={{
                        flex: 1,
                        padding: "20px",
                        gap: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor: "#fff",
                    }}
                >
                    {selectedPlayer && (
                        <div
                            style={{
                                marginRight: "20px",
                                display: "flex",
                                alignItems: "flex-start",
                                height: "100%",
                            }}
                        >
                            <img
                                src={selectedPlayer.selfie}
                                alt={selectedPlayer.playerName}
                                style={{
                                    width: "500px",
                                    height: "500px",
                                    // borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    )}

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            gap: "20px",
                            flexDirection: "column",
                            // justifyContent: "center",
                            alignItems: "flex-start",
                            height: "100%",
                        }}
                    >
                        <h2 style={{ fontWeight: "bolder" }}>Player Info</h2>
                        <>
                            <h3>
                                Name : {selectedPlayer?.playerName} ({selectedPlayer?.age}{" "}
                                years)
                            </h3>
                            <p>Type: {selectedPlayer?.type}</p>
                        </>

                        <div style={{ marginTop: "20px" }}>
                            <label htmlFor="teamDropdown">Select a Team:</label>
                            <select
                                id="teamDropdown"
                                value={selectedTeamId || ""}
                                onChange={handleTeamChange}
                                style={{
                                    display: "block",
                                    marginTop: "10px",
                                    padding: "10px",
                                    width: "100%",
                                    maxWidth: "200px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            >
                                <option value="" disabled>
                                    Select Team
                                </option>
                                {teamNames.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>
                                <h1 style={{ marginBottom: "10px" }}>
                                    {" "}
                                    Enter amount of player:
                                </h1>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Player Amount"
                                value={playerAmount}
                                onChange={handleAmountChange}
                                style={{
                                    padding: "10px",
                                    fontSize: "16px",
                                    width: "100%",
                                    maxWidth: "200px",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ddd",
                                }}
                            />
                            {playerAmount === "" && (
                                <p style={{ color: "red", marginTop: "5px" }}>
                                    Please enter a valid amount between 1 and 89.
                                </p>
                            )}
                        </div>

                        <div
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                display: "flex",
                                gap: "15px",
                            }}
                        >
                            <button
                                onClick={handleSold}
                                style={{
                                    marginRight: "10px",
                                    padding: "10px 20px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    width: "50%",
                                }}
                            >
                                Sold
                            </button>
                            <button
                                onClick={handleUnsold}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    width: "50%",
                                }}
                            >
                                Unsold
                            </button>
                        </div>

                        {playerStatus && (
                            <p
                                style={{
                                    marginTop: "20px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Status: {playerStatus}
                            </p>
                        )}

                        <button
                            onClick={fetchPlayerDetails}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                width: "100%",
                                cursor: "pointer",
                            }}
                        >
                            Get Player
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Auction;
