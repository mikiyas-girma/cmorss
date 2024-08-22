/**
 * Team Mark Component that shows the name of the
 * developing team and contributors
 * @returns JSX
 */

const TeamMark = ({ light=false }: {light: boolean}) => {
  return (
    <div className={`mx-auto text-center mt-2 ${light && 'text-white'}`}>
      <p className="text-xs sm:text-base">Designed & Developed by</p>
      <h2 className="font-extrabold font-poppins text-3xl">TEAM</h2>
      <h2 className="font-extrabold font-poppins text-3xl -mt-2">CMORSS</h2>
    </div>
  );
};

export default TeamMark;
