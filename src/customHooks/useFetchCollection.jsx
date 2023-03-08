import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { query, orderBy, onSnapshot, collection } from "firebase/firestore";


const useFetchCollection = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const collectionRef = collection(db, "houses");
    const q = query(collectionRef);
    // , orderBy("sth")

    const getCollection = () => {
        setIsLoading(true);

        // FIREBASE DOCUMENTATION   
        try {
            onSnapshot(q, (querySnapshot) => {
                const allData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(allData);
                setIsLoading(false);
            });

        } catch (error) {
            setIsLoading(false);
            // error message
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    return { data, isLoading }
}

export default useFetchCollection;