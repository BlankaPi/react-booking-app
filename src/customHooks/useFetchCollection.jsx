import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { query, orderBy, onSnapshot, collection } from "firebase/firestore";


const useFetchCollection = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true);

        // FIREBASE DOCUMENTATION   
        try {
            const collectionRef = collection(db, "houses");
            const q = query(collectionRef, orderBy("id"));

            onSnapshot(q, (querySnapshot) => {
                // console.log(querySnapshot);
                const allData = [];
                querySnapshot.forEach((doc) => {
                    allData.push(doc.data());
                });
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