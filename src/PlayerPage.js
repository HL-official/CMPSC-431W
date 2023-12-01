import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';

const PlayersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [originalPlayers, setOriginalPlayers] = useState([]); // State to store the original list of players

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/players/');
      const data = await response.json();
      setPlayers(data.players); // Set the current players state
      setOriginalPlayers(data.players); // Store the original data
    };

    fetchData().catch(console.error);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      setPlayers(originalPlayers); // Reset to the full list when search is cleared
    } else {
      const filteredPlayers = originalPlayers.filter(player => 
        player[2].toLowerCase().includes(searchTerm.toLowerCase()) // Assuming player[2] is the player name
      );
      setPlayers(filteredPlayers);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Player List
      </Typography>
      <TextField 
        label="Search Player" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">API ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">FIFA API ID</TableCell>
              <TableCell align="right">Birthday</TableCell>
              <TableCell align="right">Height (cm)</TableCell>
              <TableCell align="right">Weight (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player[0]}
                </TableCell>
                <TableCell align="right">{player[1]}</TableCell>
                <TableCell align="right">{player[2]}</TableCell>
                <TableCell align="right">{player[3]}</TableCell>
                <TableCell align="right">{player[4]}</TableCell>
                <TableCell align="right">{player[5]}</TableCell>
                <TableCell align="right">{player[6]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayersPage;
