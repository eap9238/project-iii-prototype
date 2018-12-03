const handleDomo = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoTitle").val() == '' || $("#domoBody").val() == '') {
    handleError("Please select options for all fields");
    return false;
  }

  document.getElementById("domoForm").style.display = "none";

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer($("#token").val());
  });

  return false;
};

const showModal = e => {
  //e.preventDefault();
  console.log("Yo");
  //document.getElementById("domoForm").style.display = "block";
};

const hideModal = e => {
  e.preventDefault();

  document.getElementById("domoForm").style.display = "none";
};

const handleDelete = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  sendAjax('DELETE', $("#" + e.target.id).attr("action"), $("#" + e.target.id).serialize(), function () {
    loadDomosFromServer($("token").val());
  });
};

const DomoForm = props => {
  document.getElementById("modal").onclick = function () {
    document.getElementById("domoForm").style.display = "block";
  };

  return React.createElement(
    "form",
    { id: "domoForm", onSubmit: handleDomo, name: "domoForm", action: "/maker", method: "POST", className: "domoForm" },
    React.createElement(
      "div",
      { className: "DomoFormObject" },
      React.createElement(
        "label",
        { htmlFor: "title" },
        "Title: "
      ),
      React.createElement("br", null),
      React.createElement("input", { id: "domoTitle", type: "text", name: "title", placeholder: "Note Title" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "body" },
        "Contents: "
      ),
      React.createElement("br", null),
      React.createElement("textarea", { id: "domoBody", name: "body", cols: "27", wrap: "hard", placeholder: "Note Contents" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "label",
        { "for": "duedate" },
        "Due date (Optional):"
      ),
      React.createElement("br", null),
      React.createElement("input", { type: "date", id: "duedate", name: "duedate" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "colour" },
        "Colour: "
      ),
      React.createElement("br", null),
      React.createElement(
        "select",
        { id: "domoColour", name: "colour" },
        React.createElement(
          "option",
          { style: { backgroundColor: '#DF2935' }, value: "red" },
          "red"
        ),
        React.createElement(
          "option",
          { style: { backgroundColor: '#FFE74C' }, value: "yellow" },
          "yellow"
        ),
        React.createElement(
          "option",
          { selected: true, style: { backgroundColor: '#30BCED' }, value: "blue" },
          "blue"
        ),
        React.createElement(
          "option",
          { style: { backgroundColor: '#FFAE03' }, value: "orange" },
          "orange"
        ),
        React.createElement(
          "option",
          { style: { backgroundColor: '#35FF69' }, value: "green" },
          "green"
        )
      ),
      React.createElement("input", { type: "hidden", id: "token", name: "_csrf", value: props.csrf }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" }),
      React.createElement("input", { className: "makeDomoSubmit", onClick: hideModal, type: "button", value: "Exit" })
    )
  );
};

const DomoList = function (props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null)
      )
    );
  }

  const domoNodes = props.domos.map(function (domo) {

    if (domo.date != domo.duedate) {
      return React.createElement(
        "div",
        { key: domo._id, className: domo.colour },
        React.createElement(
          "h3",
          { className: "domoTitle" },
          domo.title
        ),
        React.createElement(
          "h4",
          { className: "domoDate" },
          "Scheduled: ",
          React.createElement("br", null),
          " ",
          React.createElement(
            "a",
            { href: "https://www.google.com/calendar/render?action=TEMPLATE&text=" + domo.title + "&dates=" + domo.duedate.substring(6, 10) + domo.duedate.substring(0, 2) + domo.duedate.substring(3, 5) + "T224000Z/" + domo.duedate.substring(6, 10) + domo.duedate.substring(0, 2) + domo.duedate.substring(3, 5) + "T221500Z&details=" + domo.body },
            domo.duedate,
            "  "
          )
        ),
        React.createElement(
          "div",
          { className: "domoBody" },
          domo.body
        ),
        React.createElement(
          "form",
          { id: domo._id,
            onSubmit: handleDelete,
            name: "deleteDomo",
            action: "/deleteDomo",
            method: "DELETE"
          },
          React.createElement("input", { type: "hidden", name: "_id", value: domo._id }),
          React.createElement("input", { type: "hidden", id: "token", name: "_csrf", value: props.csrf }),
          React.createElement("input", { className: "makeDomoDelete", type: "submit", value: "X" })
        )
      );
    } else {
      return React.createElement(
        "div",
        { key: domo._id, className: domo.colour },
        React.createElement(
          "h3",
          { className: "domoTitle" },
          domo.title
        ),
        React.createElement(
          "h4",
          { className: "domoDate" },
          "Created: ",
          React.createElement("br", null),
          " ",
          domo.date,
          "  "
        ),
        React.createElement(
          "div",
          { className: "domoBody" },
          domo.body
        ),
        React.createElement(
          "form",
          { id: domo._id,
            onSubmit: handleDelete,
            name: "deleteDomo",
            action: "/deleteDomo",
            method: "DELETE"
          },
          React.createElement("input", { type: "hidden", name: "_id", value: domo._id }),
          React.createElement("input", { type: "hidden", id: "token", name: "_csrf", value: props.csrf }),
          React.createElement("input", { className: "makeDomoDelete", type: "submit", value: "X" })
        )
      );
    }
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

const DomoCount = function (props) {
  return React.createElement(
    "div",
    null,
    "Notes: ",
    props.domos.length
  );
};

const loadDomosFromServer = csrf => {
  sendAjax('GET', '/getDomos', null, data => {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos, csrf: csrf }), document.querySelector("#domos"));

    ReactDOM.render(React.createElement(DomoCount, { domos: data.domos, csrf: csrf }), document.querySelector("#count"));
  });
};

const setup = function (csrf) {
  /*
    ReactDOM.render(
    <ModalForm csrf={csrf} />, document.querySelector("#modalManager")
  );
  */

  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement(DomoList, { domos: [], csrf: csrf }), document.querySelector("#domos"));

  ReactDOM.render(React.createElement(DomoCount, { domos: [], csrf: csrf }), document.querySelector("#count"));

  loadDomosFromServer(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
// handleError()
const handleError = msg => {
  /*
  $('#errorMessage').text(msg);
  $('#domoMessage').animate({ width: 'toggle' }, 350);
  */

  window.alert(msg);
};

// redirect()
const redirect = response => {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

// sendAjax()
const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      var msgObj = JSON.parse(xhr.responseText);
      handleError(msgObj.error);
    }
  });
};
