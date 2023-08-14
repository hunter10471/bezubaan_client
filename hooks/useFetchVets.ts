import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { getVetsByQuery } from '../api/vet.api';
import { IVet } from '../interfaces/Vet.interface';

function useFetchVets() {
    const [vets, setVets] = useState<IVet[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchVets = debounce(async (searchQuery: string) => {
        try {
            setLoading(true);
            const data = await getVetsByQuery(searchQuery);
            if (data) setVets(data);
        } catch (error) {
            console.error('Error fetching vets:', error);
        } finally {
            setLoading(false);
        }
    }, 1000);

    useEffect(() => {
        if (query !== '') {
            fetchVets(query);
        } else {
            setVets([]);
        }
    }, [query]);

    return { vets, query, setQuery, loading };
}

export default useFetchVets;
