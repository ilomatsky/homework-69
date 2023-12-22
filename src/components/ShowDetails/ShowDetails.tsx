import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ShowDetails: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const [show, setShow] = React.useState<any | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        console.log(`https://api.tvmaze.com/shows/${id}`);
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{show.name}</h2>
      <p>{show.summary}</p>
    </div>
  );
};

export default ShowDetails;
