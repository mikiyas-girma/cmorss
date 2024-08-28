type ShowTurn = {
  currentPlayer: 'X' | 'O' | null;
};

const ShowPlayerTurn: React.FC<ShowTurn> = ({ currentPlayer }) => {
  return (
    <div
      className={`mx-auto text-center text-sm md:text-base bg-slate-50 max-w-[350px] font-bold py-1 px-5 rounded-xl w-fit shadow-lg animate-pulse ${
        currentPlayer === 'X' ? 'text-primary-orange' : 'text-primary-green'
      }`}
    >
      <p>Player {currentPlayer}'s turn.</p>
    </div>
  );
};

export default ShowPlayerTurn;
