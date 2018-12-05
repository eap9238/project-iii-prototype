const handleDomo = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("#domoTitle").val() == '' || $("#domoBody").val() == '') {
    handleError("Please select options for all fields");
    return false;
  }

  document.getElementById("domoForm").style.display = "none";
    
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
    loadDomosFromServer($("#token").val());
  });

  return false;
};

const showModal = (e) => {
  //e.preventDefault();
    console.log("Yo");
  //document.getElementById("domoForm").style.display = "block";
};

const hideModal = (e) => {
  e.preventDefault();
    
  document.getElementById("domoForm").style.display = "none";
};

const handleDelete = (e) => {
  e.preventDefault();
    
  $("#domoMessage").animate({width:'hide'}, 350);
    
  sendAjax('DELETE', $("#" + e.target.id).attr("action"), $("#" + e.target.id).serialize(), function(){
    loadDomosFromServer($("token").val());
  });
};

const DomoForm = (props) => {
  document.getElementById("modal").onclick = function() {
      document.getElementById("domoForm").style.display = "block";
  };
    
  return (
    <form id="domoForm" onSubmit={handleDomo} name="domoForm" action="/maker" method="POST" className="domoForm">
        <div className="DomoFormObject"> 
            <label htmlFor="title">Title: </label>
            <br/>
            <input id="domoTitle" type="text" name="title" placeholder="Note Title"/>
      
            <br/>
            <br/>
      
            <label htmlFor="body">Contents: </label>
            <br/>
            <textarea id="domoBody" name="body" cols="27" wrap="hard" placeholder="Note Contents"/>
      
            <br/>
            <br/>
            
            <label for="duedate">Due date (Optional):</label>
    
            <br/>
      
            <input type="date" id="duedate" name="duedate"/>

            <br/>
            <br/>
      
            <label htmlFor="colour">Colour: </label>
            <br/>
            <select id="domoColour" name="colour">
                <option style={{backgroundColor:'#DF2935'}} value="red">red</option>
                <option style={{backgroundColor:'#FFE74C'}} value="yellow">yellow</option>
                <option selected style={{backgroundColor:'#30BCED'}} value="blue">blue</option>
                <option style={{backgroundColor:'#FFAE03'}} value="orange">orange</option>
                <option style={{backgroundColor:'#35FF69'}} value="green">green</option>
            </select>
            <input type="hidden" id="token" name="_csrf" value={props.csrf}/>
      
            <br/>
            <br/>
      
            <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
            <input className="makeDomoSubmit" onClick={hideModal} type="button" value="Exit"/>
        </div>
    </form>
  );
};

const DomoList = function(props) {    
  if(props.domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">
        <br/>
        <br/>
        <br/>
        </h3>
      </div>
    );
  }

  const domoNodes = props.domos.map(function(domo) {
      
    if (domo.date != domo.duedate) {
        return (
          <div key={domo._id} className={domo.colour}>
            <h3 className="domoTitle">{domo.title}</h3>
            <h4 className="domoDate">Scheduled: <br/> <a href={"https://www.google.com/calendar/render?action=TEMPLATE&text=" + domo.title + "&dates=" + domo.duedate.substring(6,10) + domo.duedate.substring(0,2) + domo.duedate.substring(3,5) + "T224000Z/" + domo.duedate.substring(6,10) + domo.duedate.substring(0,2) + domo.duedate.substring(3,5) + "T221500Z&details=" + domo.body}>{domo.duedate}  </a></h4>
            <div className="domoBody">{domo.body}</div>
            <form id={domo._id}
                  onSubmit={handleDelete}
                  name="deleteDomo"
                  action="/deleteDomo"
                  method="DELETE"
            >            
                <input type="hidden" name="_id" value={domo._id}/>
                <input type="hidden" id="token" name="_csrf" value={props.csrf}/>
                <input className="makeDomoDelete" type="submit" value="X"/>
            </form>
          </div>
        );
    }
    else {
        return (
          <div key={domo._id} className={domo.colour}>
            <h3 className="domoTitle">{domo.title}</h3>
            <h4 className="domoDate">Created: <br/> {domo.date}  </h4>
            <div className="domoBody">{domo.body}</div>
            <form id={domo._id}
                  onSubmit={handleDelete}
                  name="deleteDomo"
                  action="/deleteDomo"
                  method="DELETE"
            >
                <input type="hidden" name="_id" value={domo._id}/>
                <input type="hidden" id="token" name="_csrf" value={props.csrf}/>
                <input className="makeDomoDelete" type="submit" value="X"/>
            </form>
          </div>
        );
      }
  });

  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

// CPassWindow()
const ChangePasswordWindow = (props) => {
  return (
      <div className="text-center" id="bodyContainer">
        <form   className="form-cPass mainForm"
                id='cPassForm'
                name='cPassForm'
                onSubmit={handleCPass}
                action='/changePassword'
                method='POST'
         >

            <img className="mb-4" src="/assets/img/face.png" alt="" width="146" height="146"/>
      
            <br/>
      
            <h1 className="h3 mb-3 font-weight-normal">Select a username and password</h1>
      
            <br/>

            <label htmlFor="oldPass" className="sr-only">Email address</label>
            <input id="oldPass" type="text" name='oldPass' className="form-control" required autofocus placeholder="Old Password"/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input id="inputPassword" name='inputPassword' type="password" className="form-control" required placeholder="Password"/>
            <label htmlFor='inputPassword2' className="sr-only">Password</label>
            <input id='inputPassword2' name='inputPassword2' type='password'  className="form-control" required placeholder='retype password'/>

            <input type='hidden' name='_csrf' value={props.csrf} />
      
            <br/>

            <button className='formSubmit btn btn-lg btn-primary btn-block' type='submit' type="submit">Sign Up</button>
      
            <br/>
      
            <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
        </form>
    </div>
  );
};

// handleSignup()
const handleCPass = (e) => {
  // Preventing default redirect behavior + hiding the Domo error
  e.preventDefault();
  $('#domoMessage').animate({ width: 'hide' }, 350);
  
  // IF not all of the fields are filled in...
  if ($('#oldPass').val() == '' || $('#inputPassword').val() == '' || $('#inputPassword2').val() == '') {
    handleError("Please select options for all fields");
    return false;
  }
  
  // IF both password fields are not the same...
  if ($('#inputPassword').val() !== $('#inputPassword2').val()) {
    handleError("New passwords do not match");
    return false;
  }
  
  // 
  sendAjax('POST', $('#cPassForm').attr('action'), $('#cPassForm').serialize(), redirect);
  
  return false;
};

// createSignupWindow()
const createCPassWindow = (csrf) => {
  ReactDOM.render(
    <ChangePasswordWindow csrf={csrf} />,
    document.querySelector('#content')
  );
};

const DomoCount = function(props) {
    return (
        <a href="#">Notes: {props.domos.length}</a>
    );
};

const loadDomosFromServer = (csrf) => {
  sendAjax('GET', '/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} csrf={csrf}/>, document.querySelector("#domos")
    );

    ReactDOM.render(
      <DomoCount domos={data.domos} csrf={csrf}/>, document.querySelector("#count")
    );
  });
};

const setup = function(csrf) {
  const cPassWindow = document.querySelector('#cPassButton');
  
  cPassWindow.addEventListener('click', (e) => {
    e.preventDefault();
    createCPassWindow(csrf);
    return false;
  });
    
  ReactDOM.render(
    <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
  );

  ReactDOM.render(
    <DomoList domos={[]} csrf={csrf}/>, document.querySelector("#domos")
  );

  ReactDOM.render(
    <DomoCount domos={[]} csrf={csrf}/>, document.querySelector("#count")
  );

  loadDomosFromServer(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});