import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_Base = 'http://localhost:5001/api';

export const useTechnologies = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_Base}/trends`);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshData = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_Base}/refresh`);
            await fetchData();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refreshData };
};
