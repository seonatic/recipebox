<Modal show={this.state.show} onHide={this.handleClose}>
	          <Modal.Header closeButton>
	            <Modal.Title>Add recipe</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
			      <form>
			        <FormGroup
			          controlId="formBasicText"
			         
			        >
			          <ControlLabel>Recipe Title</ControlLabel>
			          
			          <FormControl
			            type="text"
			            value={this.state.valueTitle}
			            placeholder="Enter recipe title"
			            onChange={this.handleChangeTitle}
			          />

			          <ControlLabel>Ingredients</ControlLabel>
			          
			          <FormControl
			            type="text"
			            value={this.state.valueIngredients}
			            placeholder="Enter ingredients"
			            onChange={this.handleChangeIngredients}
			          />		          
			         
			        </FormGroup>
			      </form>
	            
	            <p>
	              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
	            </p>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={this.handleClose}>Close</Button>
	            <Button className='btn-primary' onClick={this.submit(this.state.valueTitle, this.state.valueIngredients)}>Submit</Button>
	          </Modal.Footer>
	        </Modal>




	        //submit function:

	        submit(title, ingredients){
	var list = this.state.recipes;
	list.push({title: title})
	this.setState({recipes: list})
}