import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import movieApi from '../api/movieAPI';
import { initialMovieState, movieReducer } from '../reducers/movieReducers';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      // Normalize ID thành string để đảm bảo nhất quán
      const normalizedMovies = response.data.map(movie => ({
        ...movie,
        id: String(movie.id) // Đảm bảo ID luôn là string
      }));
      dispatch({ type: 'SET_MOVIES', payload: normalizedMovies });
    } catch (error) {
      console.error('Error fetching movies:', error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error('Error fetching genres:', error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        // Xử lý cả ID số và string để tương thích với cả phim cũ và mới
        let movieId = null;
        if (id !== null && id !== undefined && id !== '') {
          // Convert sang string để nhất quán
          movieId = String(id).trim();
        }
        
        if (!movieId || movieId === 'null' || movieId === 'undefined' || movieId === '0') {
          console.error('Invalid movie ID for deletion:', id, 'Type:', typeof id);
          dispatch({ type: 'STOP_LOADING' });
          alert('Không thể xóa: ID không hợp lệ');
          return;
        }
        
        console.log('=== DELETE ATTEMPT ===');
        console.log('Movie ID:', movieId, 'Type:', typeof movieId);
        console.log('API URL:', `/movies/${movieId}`);
        console.log('Full URL:', `${movieApi.defaults.baseURL}/movies/${movieId}`);
        
        // Gọi API delete với ID dạng string
        const response = await movieApi.delete(`/movies/${movieId}`);
        console.log('Delete successful! Response:', response);
        await fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        dispatch({ type: 'STOP_LOADING' });
        alert(`Lỗi khi xóa phim: ${error.response?.data?.message || error.message || 'Không xác định'}`);
        await fetchMovies();
      }
    },
    [fetchMovies]
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          // Đảm bảo ID là string để nhất quán với json-server
          const movieId = isEditingId ? String(isEditingId) : (dataToSend.id ? String(dataToSend.id) : null);
          if (!movieId) {
            console.error('Invalid movie ID for update');
            dispatch({ type: 'STOP_LOADING' });
            return false;
          }
          // Đảm bảo dataToSend.id cũng là string
          const updateData = { ...dataToSend, id: String(dataToSend.id || movieId) };
          console.log('Updating movie with ID:', movieId, 'Data:', updateData);
          await movieApi.put(`/movies/${movieId}`, updateData);
        } else {
          // Đảm bảo ID mới là string
          const createData = { ...dataToSend, id: String(dataToSend.id) };
          console.log('Creating movie with ID:', createData.id, 'Data:', createData);
          await movieApi.post('/movies', createData);
        }
        dispatch({ type: 'RESET_FORM' });
        await fetchMovies();
        return true;
      } catch (error) {
        console.error('Error in CREATE/UPDATE movie:', error);
        console.error('Error response:', error.response);
        dispatch({ type: 'STOP_LOADING' });
        await fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

