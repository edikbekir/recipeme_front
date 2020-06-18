import React, { useState } from 'react';
import Page from 'components/Page';
import { recipeActions } from '../data/actions/recipes';
import MultiSearchSelect from 'components/MultiSearchSelect';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

import {
  connect
} from 'react-redux';

const CreateRecipePage = props => {

  const [values, setValues] = useState({name: '', description: '', file: {} });

  const handleInputChange = e => {
    const {name, value, files} = e.target;
    const newData = files ? files[0] : value;
    setValues({...values, [name]: newData });
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.onCreateRecipe(values)
  }

  const { t } = props;

  return (
    <Page title={t('createRecipe')} breadcrumbs={[{ name: 'Recipes', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>
              <div>
                {props.t('createRecipeName')}
              </div>
              <div>
                {props.t('createRecipeDescription')}
              </div>
              <div>
                {props.t('createRecipeSteps')}
              </div>
              <div>
                {props.t('createRecipeIngredients')}
              </div>
              <div>
                {props.t('createRecipeImage')}
              </div>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">{t('name')}</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder={t('createRecipeNamePlaceholder')}
                    value={values.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">{t('description')}</Label>
                  <Input
                    type="textarea"
                    name="description"
                    placeholder={t('createRecipeDescriptionPlaceholder')}
                    value={values.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">{t('file')}</Label>
                  <Input type="file" name="file" onChange={handleInputChange}/>
                  <FormText color="muted">
                    Max size: 5MB
                  </FormText>
                </FormGroup>
                <Button onClick={handleSubmit}>{t('createRecipeSubmit')}</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateRecipe: params => dispatch(recipeActions.createRecipe(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipePage);
