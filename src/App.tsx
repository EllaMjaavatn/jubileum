import { useMemo, useState } from "react";
import confetti from "canvas-confetti";

const images = [
  {
    src: "/images/EllaogJørgen-13.jpg",
    text: "Første minner sammen ❤️",
    width: "250px",
    height: "350px",
  },
  {
    src: "/images/IMG_3476.JPG",
    text: "En av mine favoritter 💘",
    width: "250px",
    height: "350px",
  },
];

function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export default function App() {
  const [open, setOpen] = useState(false);

  const [pickedDate, setPickedDate] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const CORRECT_DATE = "2018-02-13"; //input type="date" bruker dette formatet
  const todayText = useMemo(() => new Date().toLocaleDateString("no-NO"), []);

  //const dateText = useMemo(() => {
  //return new Date().toLocaleDateString("no-NO");
  //}, []);

  function checkDate() {
    if (!pickedDate) {
      setError("Vennligst velg en dato.");
      setUnlocked(false);
      return;
    }

    if (pickedDate === CORRECT_DATE) {
      setUnlocked(true);
      setOpen(true);
      setError("");
      fireConfetti();
    } else {
      setError("Det var ikke riktig dato 😢 Prøv igjen.");
      setUnlocked(false);
    }
  }

  return (
    <main className="page">
      <h1 className="title">Lås opp brevet</h1>

      {/* Viser Åpne/Lukk bare hvis datoen er riktig */}
      {!unlocked && (
        <>
          <label className="label">
            Velg datoen for jubileet vårt:
            <input
              type="date"
              value={pickedDate}
              onChange={(e) => setPickedDate(e.target.value)}
            />
          </label>
          <button className="btn" type="button" onClick={checkDate}>
            Sjekk dato
          </button>

          {error && <p className="error">{error}</p>}

          {/*  <button
            className="openBtn"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Lukk brevet" : "Åpne brevet"}
          </button> */}
        </>
      )}

      {/* Viser brevet bare hvis det er låst opp og Åpent */}
      {unlocked && open && (
        <div className="popupOverlay">
          <div className="popupLetter">
            <button className="closeBtn" onClick={() => setOpen(false)}>
              ×
            </button>

            <p className="date">Dato: {todayText}</p>
            <h2 className="sender">Til deg 💘</h2>

            <p className="text">
              Gratulerer med 8 år sammen!
              <br />
              Jeg er så glad i deg.
              <br />
              Takk for alle minnene vi har sammen ❤️
            </p>

            <p className="signature">— Fra meg</p>

            <div className="cardGallery">
              {images.map((img, i) => (
                <div key={i} className="card">
                  <img className="cardImg" src={img.src} alt={img.text} />
                  <p className="cardText">{img.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
