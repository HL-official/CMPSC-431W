import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [Teams, setTeams] = useState([]);
  const [originalTeams, setOriginalTeams] = useState([]); // State to store the original list of Teams

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/teams/');
      const data = await response.json();
      setTeams(data.Teams); // Set the current Teams state
      setOriginalTeams(data.Teams); // Store the original data
    };

    fetchData().catch(console.error);
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      setTeams(originalTeams); // Reset to the full list when search is cleared
    } else {
      const filteredTeams = originalTeams.filter(Team => 
        Team[4].toLowerCase().includes(searchTerm.toLowerCase()) // Assuming Team[2] is the Team name
      );
      setTeams(filteredTeams);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Team List
      </Typography>
      <TextField 
        label="Search Team" 
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
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Team API ID</TableCell>
              <TableCell align="right">Team FIFA API ID</TableCell>
              <TableCell align="right">Team Name</TableCell>
              <TableCell align="right">Short Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Teams.map((Team) => (
              <TableRow
                key={Team[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Team[0]}
                </TableCell>
                <TableCell align="right">{Team[1]}</TableCell>
                <TableCell align="right">{Team[2]}</TableCell>
                <TableCell align="right">{Team[3]}</TableCell>
                <TableCell align="right">{Team[4]}</TableCell>
                <TableCell align="right">{Team[5]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamsPage;
