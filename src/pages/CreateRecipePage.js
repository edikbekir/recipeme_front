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

  return (
    <Page title="Recipes" breadcrumbs={[{ name: 'Recipes', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>
              <div>
                1. You need to come up with a name
              </div>
              <div>
                2. You need to come up with a description
              </div>
              <div>
                3. You need to add steps
              </div>
              <div>
                4. You need to add ingredients
              </div>
              <div>
                5. You need to add image
              </div>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Please enter the name of your recipe"
                    value={values.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    placeholder="Please сreate a description of your recipe"
                    value={values.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">File</Label>
                  <Input type="file" name="file" onChange={handleInputChange}/>
                  <FormText color="muted">
                    Max size: 5MB
                  </FormText>
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
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
