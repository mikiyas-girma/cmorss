import React, { useEffect, useState, useRef } from 'react';
import Player, { PlayerData } from '../components/common/LeaderboardPlayer';
import { fetchMockPlayers } from '../mock';

export interface PlayerFetchedData {
	_id: string;
	pseudo: string;
	wins: number;
	draws: number;
	loses: number;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<(PlayerData & {_id: string})[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPlayerElementRef = useRef<HTMLTableRowElement | null>(null);

  const fetchPlayers = async (pageNumber: number) => {
    setLoading(true);
    try {
      // const response = await fetch(`/api/user?order_by=score&page=${pageNumber}`);
      const data = await fetchMockPlayers(pageNumber, 'wins');
      setPlayers((prevPlayers) => [
				...prevPlayers,
				...(data.map((p: PlayerFetchedData) => ({
					rank: 0,
					_id: p._id,
					username: p.pseudo,
					score: {
						wins: p.wins,
						draws: p.draws,
						loses: p.loses,
					}
				})))
			]);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(page);
  }, [page]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const lastEntry = entries[0];
    if (lastEntry.isIntersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastPlayerElementRef.current) {
      observer.current.observe(lastPlayerElementRef.current);
    }

    return () => {
      if (lastPlayerElementRef.current && observer.current) {
        observer.current.unobserve(lastPlayerElementRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 font-poppins">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary-blue md:text-5xl lg:text-6xl">Leaderboard</h1>
      <table
        className="relative w-4/5 max-w-[700px] text-right text-sm font-light text-surface">
        <thead
          className="border-b border-neutral-200 bg-secondary-blue font-medium text-white sticky top-0">
          <tr>
            <th scope="col" className=" px-6 py-4">Rank</th>
            <th scope="col" className=" px-6 py-4 w-3/6 text-left">Username</th>
            <th scope="col" className=" px-6 py-4">Wins</th>
            <th scope="col" className=" px-6 py-4">Draws</th>
            <th scope="col" className=" px-6 py-4">loses</th>
          </tr>
        </thead>
        <tbody>
					{players.map((player, index) => {
						const isLastPlayer = players.length === index + 1;
						return (
							<tr
								className={`border-b border-neutral-200 dark:border-white/10 text-neutral-900
									${index % 2 == 0 ? 'bg-black/[0.02]': 'bg-white dark:bg-body-dark'}`}
								ref={isLastPlayer ? lastPlayerElementRef : undefined} key={player._id}
							>
								<Player player={{...player, rank: index + 1}} />
							</tr>
						);
					})}
        </tbody>
      </table>
      {loading && !lastPlayerElementRef.current && <p>Loading...</p>}
    </div>
  );
};

export default Leaderboard;