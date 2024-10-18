import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/email_categories/email_categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditEmail_categories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    email: '',

    category: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { email_categories } = useAppSelector(
    (state) => state.email_categories,
  );

  const { email_categoriesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: email_categoriesId }));
  }, [email_categoriesId]);

  useEffect(() => {
    if (typeof email_categories === 'object') {
      setInitialValues(email_categories);
    }
  }, [email_categories]);

  useEffect(() => {
    if (typeof email_categories === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = email_categories[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [email_categories]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: email_categoriesId, data }));
    await router.push('/email_categories/email_categories-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit email_categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit email_categories'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Email' labelFor='email'>
                <Field
                  name='email'
                  id='email'
                  component={SelectField}
                  options={initialValues.email}
                  itemRef={'emails'}
                  showField={'subject'}
                ></Field>
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field
                  name='category'
                  id='category'
                  component={SelectField}
                  options={initialValues.category}
                  itemRef={'categories'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/email_categories/email_categories-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditEmail_categories.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_EMAIL_CATEGORIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditEmail_categories;
