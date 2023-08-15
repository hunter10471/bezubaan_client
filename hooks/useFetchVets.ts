import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { getClosestVets, getVetsByQuery } from '../api/vet.api';
import { IVet } from '../interfaces/Vet.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function useFetchVets() {
    const [vets, setVets] = useState<IVet[]>([]);
    const [closeVets, setCloseVets] = useState<IVet[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const authState = useSelector((state: RootState) => state.user);

    const fetchVets = debounce(async (searchQuery) => {
        try {
            setLoading(true);
            const response = await getVetsByQuery(searchQuery);
            if (response) {
                setVets(response);
            }
        } catch (error) {
            console.error('Error fetching vets:', error);
        } finally {
            setLoading(false);
        }
    }, 2000);

    const fetchClosestVets = async () => {
        try {
            if (authState.lat && authState.long) {
                setLoading(true);
                const response = await getClosestVets(
                    authState.lat,
                    authState.long
                );
                if (response) setCloseVets(response);
            }
        } catch (error) {
            console.error('Error fetching vets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClosestVets();
        fetchVets('');
    }, []);

    useEffect(() => {
        if (query !== '') {
            setCloseVets([]);
            fetchVets(query);
        } else {
            setVets([]);
            setCloseVets(closeVets);
        }
    }, [query]);

    return { vets, closeVets, query, setVets, setQuery, loading };
}

export default useFetchVets;
