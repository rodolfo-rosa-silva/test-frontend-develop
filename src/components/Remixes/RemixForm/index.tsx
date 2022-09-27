/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  GenreTypeEnum,
  IRemixCreateDto,
  IRemixModel,
  IRemixUpdateDto
} from '@/graphql/types/_server';
import { CREATE_REMIX, GET_REMIXES, UPDATE_REMIX } from '@/graphql/queries';

import styles from './styles';
import client from '@/helpers/client';

const RemixSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  authorEmail: Yup.string().email('Invalid email').required('Required')
});

const initialValues = {
  name: '',
  authorEmail: '',
  genre: GenreTypeEnum.Electronic,
  price: 0,
  trackLength: 0,
  isStore: 'yes',
  description: ''
};

const RemixForm: React.FC = () => {
  const { remixId } = useParams();
  const navigate = useNavigate();
  const [createRemix, { loading: loadingCreate }] = useMutation(CREATE_REMIX);
  const [updateRemix, { loading: loadingUpdate }] = useMutation(UPDATE_REMIX);
  const remixesData = client.readQuery({ query: GET_REMIXES });

  const formik = useFormik({
    initialValues,
    validationSchema: RemixSchema,
    onSubmit: (values) => {
      const payload: IRemixCreateDto = {
        ...values,
        isStore: values.isStore === 'yes'
      };
      if (remixId) {
        handleUpdate({ ...payload, id: parseInt(remixId, 10) });
      } else {
        handleCreate(payload);
      }
    }
  });

  const { values, errors, handleChange, touched } = formik;

  const handleCreate = (payload: IRemixCreateDto) => {
    createRemix({
      variables: { payload },
      refetchQueries: [GET_REMIXES],
      onCompleted: () => formik.resetForm()
    });
  };

  const handleUpdate = (payload: IRemixUpdateDto) => {
    updateRemix({
      variables: { payload },
      refetchQueries: [GET_REMIXES],
      onCompleted: () => {
        navigate('/remixes');
        formik.resetForm();
      }
    });
  };

  useEffect(() => {
    if (remixId) {
      const remix: IRemixModel = remixesData?.remixes?.items?.find(
        (remix: IRemixModel) => remix.id === parseInt(remixId, 10)
      );
      if (remix) {
        formik.setValues({
          name: remix.name,
          authorEmail: remix.authorEmail,
          genre: remix.genre,
          price: remix.price,
          trackLength: remix.trackLength,
          isStore: remix.isStore ? 'yes' : 'no',
          description: remix.description
        });
      }
    } else {
      formik.setValues(initialValues);
    }
  }, [remixId]);

  return (
    <Box sx={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            minLength={3}
            maxLength={50}
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>authorEmail:</label>
          <input
            type="email"
            name="authorEmail"
            onChange={handleChange}
            value={values.authorEmail}
          />
          {errors.authorEmail && touched.authorEmail && <span>{errors.authorEmail}</span>}
        </div>
        <div>
          <label>genre:</label>
          <select name="genre" onChange={handleChange} value={values.genre}>
            {Object.values(GenreTypeEnum).map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>price:</label>
          <input
            type="number"
            min={0}
            max={1000}
            name="price"
            onChange={handleChange}
            value={values.price}
          />
        </div>
        <div>
          <label>trackLength:</label>
          <input
            type="number"
            min={0}
            max={300}
            name="trackLength"
            onChange={handleChange}
            value={values.trackLength}
          />
        </div>
        <div>
          <label>isStore:</label>
          <select name="isStore" onChange={handleChange} value={values.isStore}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>description:</label>
          <textarea
            name="description"
            maxLength={500}
            onChange={handleChange}
            value={values.description}
          />
        </div>
        <div />
        <div />
        <div>
          <button type="submit">{loadingCreate || loadingUpdate ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </Box>
  );
};

export default RemixForm;
