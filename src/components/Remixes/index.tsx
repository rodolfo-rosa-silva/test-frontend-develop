import React from 'react';
import Box from '@mui/material/Box';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_REMIXES, DELETE_REMIX } from '@/graphql/queries';
import { IRemixModel } from '@/graphql/types/_server';

import styles from './styles';
import RemixForm from './RemixForm';

const Remixes: React.FC = () => {
  const { data } = useQuery(GET_REMIXES);
  const [deleteRemix, { loading: loadingDelete }] = useMutation(DELETE_REMIX);

  const handleDelete = (remixId: number) => {
    deleteRemix({
      variables: { payload: { id: remixId } },
      refetchQueries: [GET_REMIXES]
    });
  };

  return (
    <Box sx={styles.container}>
      <RemixForm />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>authorEmail</th>
            <th>description</th>
            <th>genre</th>
            <th>isStore</th>
            <th>price</th>
            <th>trackLength</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {data?.remixes?.items.map((remix: IRemixModel) => (
            <tr key={remix.id}>
              <td>{remix.id}</td>
              <td>{remix.name}</td>
              <td>{remix.authorEmail}</td>
              <td>{remix.description}</td>
              <td>{remix.genre}</td>
              <td>{remix.isStore ? 'yes' : 'no'}</td>
              <td>{remix.price}</td>
              <td>{remix.trackLength}</td>
              <td>
                <Link to={`/remixes/${remix.id}`}>EDIT</Link>
              </td>
              <td>
                <button
                  type="button"
                  disabled={loadingDelete}
                  onClick={() => handleDelete(remix.id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Remixes;
