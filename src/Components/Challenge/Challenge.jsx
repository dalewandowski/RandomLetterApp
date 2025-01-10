export default function Challenge({
  handleStartChallenge,
  timeLeft,
  className,
}) {
  return (
    <>
      <button
        onClick={handleStartChallenge}
        type="button"
        className={className}
      >
        Graj Na czas!
      </button>
    </>
  );
}
