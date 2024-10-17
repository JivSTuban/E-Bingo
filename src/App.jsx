import { useState } from "react"
import { Button, TextField, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"

export default function Component() {
  const [gameCode, setGameCode] = useState("")

  const getGameCode = (e) => {
    setGameCode(e.target.value)
  }

  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
      <Box className="Bingo-Logo" sx={{ marginBottom: 4 }}>
        <Typography variant="h1" sx={{ 
          fontWeight: 'bold', 
          fontSize: '4rem',
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FDCB6E)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '0.1em'
        }}>
          BINGO
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          width: '100%', 
          marginTop: 2 
        }}>
          {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
            <Box 
              key={letter}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'white',
                background: `hsl(${index * 60}, 70%, 50%)`,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              {letter}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
        <TextField
          id="game-code"
          label="Game Code"
          sx={{ width: "340px" }}
          onChange={getGameCode}
        />
        <Link to={`/bingo/play/${gameCode}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              height: "55px",
              marginLeft: "10px",
              backgroundColor: "#32937c",
              "&:hover": {
                backgroundColor: "#61992f",
              },
            }}
            disabled={gameCode.trim() === ""}
          >
            Enter Game
          </Button>
        </Link>
      </Box>
    </Box>
  )
}