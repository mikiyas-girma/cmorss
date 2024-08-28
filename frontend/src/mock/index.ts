import { PlayerFetchedData } from '../routes/Leaderbord';

export const fetchMockPlayers = async (
    pageNumber: number,
    orderby: 'wins' | 'draws' | 'loses' | null
): Promise<[] | PlayerFetchedData[]> => {
    try {
      const usersData = await import('./users.json');

      let players = usersData.users;

      if (orderby) {
        players = players.sort((a, b) => {
          if (orderby === 'wins') {
            return b.wins - a.wins;
          }
          return 0;
        });
      }
  
      const itemsPerPage = 20;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const paginatedPlayers = players.slice(startIndex, startIndex + itemsPerPage);
  
      return paginatedPlayers.map((p) => ({
        _id: p._id,
        pseudo: p.pseudo,
        wins: p.wins,
        draws: p.draws,
        loses: p.loses,
      }));
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  };