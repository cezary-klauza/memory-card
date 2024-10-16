import Card from "../components/Card"


const Game = () => {
    
  return (
    <div className="game">
        <div className="scores">
            <div className="score">
                <img src="/time.svg" alt="clock" />
                <p>2:22</p>
            </div>
            <div className="score">
                <img src="/x.svg" alt="fails" />
                <p>5</p>
            </div>
            <div className="score">
                <img src="/match.svg" alt="cards" />
                <p>1/4</p>
            </div>
        </div>

        <div className="grid normal">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}

export default Game