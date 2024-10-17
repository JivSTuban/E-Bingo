import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Grid, Typography, Box, Paper, CircularProgress } from "@mui/material"
import axios from "axios"

export default function PlayerDashboard() {
  const { gameCode } = useParams()
  const [bingoCards, setBingoCards] = useState([])
  const [numberArray, setNumberArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generateCard = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`)
      const randomColor = getRandomColor()
      const cardData = res.data.card
      const playcard = {
        playcard_token: res.data.playcard_token,
        color: randomColor,
        winStatus: -1,
        card: Object.keys(cardData).map((key) => ({
          letter: key,
          values: cardData[key].map((number) => ({
            number,
            isRolled: numberArray.includes(number),
          })),
        })),
      }
      const result = await axios.get(
        `http://www.hyeumine.com/checkwin.php?playcard_token=${playcard.playcard_token}`
      )
      playcard.winStatus = result.data
      setBingoCards((prevCards) => [...prevCards, playcard])
    } catch (error) {
      console.error("Error generating card:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkWin = async (playcardToken) => {
    try {
      const res = await axios.get(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcardToken}`)
      const updatedCards = bingoCards.map((bingoCard) => {
        if (bingoCard.playcard_token === playcardToken) {
          return {
            ...bingoCard,
            winStatus: res.data,
            card: bingoCard.card.map((column) => ({
              ...column,
              values: column.values.map((value) => ({
                ...value,
                isRolled: numberArray.includes(value.number),
              })),
            })),
          }
        }
        return bingoCard
      })
      setBingoCards(updatedCards)
    } catch (error) {
      console.error("Error checking win:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://www.hyeumine.com/bingodashboard.php?bcode=${gameCode}`)
        const regex = /<button[^>]*class="btn btn-success"[^>]*>(\d+)<\/button>/g
        const matches = res.data.match(regex)
        const numbers = matches
          ? matches.map((match) => parseInt(match.replace(/<\/?[^>]+(>|$)/g, ""), 10))
          : []
        const numberArray = numbers && numbers.length ? numbers : Array(25).fill(0)
        setNumberArray(numberArray)
      } catch (error) {
        console.error("Error fetching game data:", error)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 1000)
    return () => clearInterval(intervalId)
  }, [gameCode])

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 50%)`
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
        <Typography variant="h1" sx={{ 
          fontWeight: 'bold', 
          fontSize: '4rem',
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FDCB6E)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '0.1em',
          marginBottom: 2
        }}>
          BINGO
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          width: '300px', 
          marginBottom: 2 
        }}>
          {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
            <Box 
              key={letter}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Game Code: {gameCode}</Typography>
      <Button
        variant="contained"
        sx={{
          height: "55px",
          marginBottom: 4,
          backgroundColor: "#FF6B6B",
          "&:hover": {
            backgroundColor: "#45B7D1",
          },
        }}
        onClick={generateCard}
        disabled={isLoading || gameCode.trim() === ""}
      >
        {isLoading ? <CircularProgress size={24} sx={{ color: "#45B7D1" }} /> : "Get Another Card"}
      </Button>
      <Grid container spacing={3}>
        {bingoCards.map((bingoCard, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={{ 
              padding: 2, 
              borderRadius: 2, 
              border: `5px solid ${bingoCard.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1" sx={{ color: bingoCard.color, marginBottom: 1 }}>
                Playcard token: {bingoCard.playcard_token}
              </Typography>
              {bingoCard.winStatus === 1 && (
                <Typography variant="h6" sx={{ color: 'pink', fontWeight: 'bold', marginBottom: 1 }}>
                  Bingo! You won!
                </Typography>
              )}
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                width: '100%',
                marginBottom: 2
              }}>
                {bingoCard.card.map((column, columnIndex) => (
                  <Box key={columnIndex} sx={{ display: 'flex', flexDirection: 'column', margin: 0.5 }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px solid ${bingoCard.color}`,
                      color: bingoCard.color,
                      fontWeight: 'bold'
                    }}>
                      {column.letter}
                    </Box>
                    {Array.isArray(column.values) && column.values.map((value, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: `1px solid ${bingoCard.color}`,
                          color: value.isRolled ? 'white' : bingoCard.color,
                          backgroundColor: value.isRolled ? "#06361b" : "white",
                        }}
                      >
                        {value.number}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  backgroundColor: "pink",
                  "&:hover": {
                    backgroundColor: "blue",
                  },
                }}
                onClick={() => checkWin(bingoCard.playcard_token)}
              >
                Check Win
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}