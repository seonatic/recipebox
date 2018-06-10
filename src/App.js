import React from "react";
import {
  Button,
  PanelGroup,
  Panel,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

class Recipe extends React.Component {
  edit() {
    this.props.editButton(this.props.index);
  }

  remove() {
    this.props.deleteButton(this.props.index);
  }

  renderNormal() {
    //below allows to run through array of ingredients and show each in own bullet
    var listItems = this.props.ingredients.map(function(data, i) {
      return <li key={i}>{data}</li>;
    });

    return (
      <div className="recipe">
        <PanelGroup
          accordion
          id="accordion-uncontrolled-example"
          defaultActiveKey="2"
        >
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>{this.props.title}</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>
              <ul>{listItems}</ul>
              <Button className="btn-info" onClick={this.edit.bind(this)}>
                {" "}
                Edit
              </Button>
              <Button className="btn-danger" onClick={this.remove.bind(this)}>
                Delete
              </Button>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  render() {
    return this.renderNormal();
  }
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleEditShow = this.handleEditShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.submit = this.submit.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);

    this.state = {
      show: false,
      editMode: false,
      valueTitle: "",
      valueIngredients: "",
      editableIndex: "",
      //uses sessionStorage remember the state during the session.
      //JSON.parse returns a string, setItem turns recipes into
      // an object.
      //the || operator set the state to the current session or gets the initial recipes
      recipes: JSON.parse(sessionStorage.getItem("recipes")) || [
        {
          title: "Paella",
          ingredients: ["rice", "onions", "olive oil", "chicken", "tomatoes"]
        },
        {
          title: "Risotto",
          ingredients: ["rice", "parmesan cheese", "white wine", "onions"]
        },
        {
          title: "Brownie",
          ingredients: [
            "flour",
            "eggs",
            "caster sugar",
            "milk",
            "chocolate",
            "baking powder"
          ]
        }
      ]
    };
  }

  handleClose() {
    this.setState({ show: false });
    this.setState({ editMode: false });
  }

  handleEditShow(i) {
    this.setState({ editMode: true });
    this.setState({ show: true });
    this.setState({ editableIndex: i });
    this.setState({ valueTitle: this.state.recipes[i].title });
    this.setState({ valueIngredients: this.state.recipes[i].ingredients });
  }

  handleShow(i) {
    this.setState({ show: true });
  }

  handleChangeTitle(e) {
    this.setState({ valueTitle: e.target.value });
  }

  handleChangeIngredients(e) {
    this.setState({ valueIngredients: e.target.value });
  }

  removeRecipe(i) {
    var list = this.state.recipes;
    list.splice(i, 1);
    this.onSetResult("recipes", list);
    this.setState({ recipes: list });
  }

  onSetResult(data, newData) {
    sessionStorage.setItem(data, JSON.stringify(newData));
  }

  submit() {
    var list = this.state.recipes;
    var newTitle = this.state.valueTitle;
    var newIngredients = this.state.valueIngredients.split(",");
    if (this.state.editMode === false) {
      list.push({ title: newTitle, ingredients: newIngredients });
    } else {
      list.splice(this.state.editableIndex, 1, {
        title: newTitle,
        ingredients: newIngredients
      });
    }
    this.onSetResult("recipes", list);
    this.setState({ recipes: list });
    this.setState({ valueTitle: "" });
    this.setState({ valueIngredients: "" });
    this.handleClose();
  }

  renderList() {
    return (
      <div>
        <div className="recipeList">
          {this.state.recipes.map(function(data, i) {
            return (
              <Recipe
                key={i}
                index={i}
                title={data.title}
                ingredients={data.ingredients}
                data={data}
                deleteButton={this.removeRecipe}
                editButton={this.handleEditShow}
              />
            );
          }, this)}
        </div>
        <Button className="btn-primary" onClick={this.handleShow}>
          Add
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Title</ControlLabel>

                <FormControl
                  type="text"
                  value={this.state.valueTitle}
                  placeholder="Enter recipe title"
                  ref="newTitle"
                  onChange={this.handleChangeTitle}
                />

                <ControlLabel>Ingredients</ControlLabel>

                <FormControl
                  type="text"
                  value={this.state.valueIngredients}
                  placeholder="Enter ingredients, separate each with a comma"
                  ref="newIngredients"
                  onChange={this.handleChangeIngredients}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button className="btn-primary" onClick={this.submit.bind(this)}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div> //end of render return div
    );
  }

  render() {
    return this.renderList();
  }
} //ends App class extension

export default App;
