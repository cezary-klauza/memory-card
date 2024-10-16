const Card = () => {
  return (
    <div className="card">
        <div className="front">
            <p>1</p>
            <div className="shadow" aria-hidden />
        </div>
        <div className="back">
            <div className="glow" aria-hidden/>
            <img src="/question-mark.svg" alt="question-mark" />
        </div>
    </div>
  )
}

export default Card