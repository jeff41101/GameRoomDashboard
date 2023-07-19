"use strict";

let image_base64 = "wqewqeqwe ";

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
};

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    console.log(reader.result);
    document.getElementById("imgBase64").value = String(reader.result);
  };
  reader.readAsDataURL(file);
  dropArea.classList.add("active");
  showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile() {
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if (validExtensions.includes(fileType)) {
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

function submitImage() {
  let name = document.getElementById("imgName").value;
  let link = document.getElementById("imgLink").value;
  let imgbase64 = document.getElementById("imgBase64").value;
  // let imgbase64 = document.getElementById("imgBase64").value;
  console.log(name);
  // DynamoDB Version
  // var settings = {
  //   url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/StoreImage",
  //   method: "POST",
  //   timeout: 0,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
  //   },
  //   data: JSON.stringify({
  //     Name: name,
  //     Link: link,
  //     Number: "",
  //     img_base64: imgbase64,
  //   }),
  // };

  var settings = {
    url: "https://7wda3149g7.execute-api.ap-northeast-1.amazonaws.com/dev/PutImages",
    method: "POST",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": "WvaKUMz6q5aH6DtSdOWXO5HxIQnOrzfJ3apbIo4F",
    },
    data: JSON.stringify({
      Name: name,
      Link: link,
      img_base64: imgbase64,
    }),
  };

  $.ajax(settings).done(function (response) {
    if ((response["statusCode"] = "200")) {
      alert("新增成功");
      document.getElementById("imgName").value = "";
      document.getElementById("imgLink").value = "";
      document.getElementById("imgBase64").value = "";
      window.location.reload();
    } else {
      alert("新增失敗");
    }
  });

  //  window.location.reload();
}

function deleteimg(id) {
  console.log(id);
  //DynamoDB Version
  var settings = {
    url: "https://7wda3149g7.execute-api.ap-northeast-1.amazonaws.com/dev/DeleteImages",
    method: "POST",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
    },
    data: JSON.stringify({
      Id: id,
    }),
  }; //]]

  // var settings = {
  //   url: "https://7wda3149g7.execute-api.ap-northeast-1.amazonaws.com/dev/DeleteImages",
  //   method: "POST",
  //   timeout: 0,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
  //   },
  //   data: JSON.stringify({
  //     Id: id,
  //   }),
  // };

  $.ajax(settings).done(function (response) {
    console.log(response["statusCode"]);
    if ((response["statusCode"] = "200")) {
      alert("刪除成功");
      window.location.reload();
    }
  });
}

let leadershipBoard = document.querySelector(".leadership-board");

const displayMatchingGameLeaderBoard = function (list, sort = false) {
  jQuery.extend({
    // DynamoDB Version
    // getImage: function () {
    //   let result = null;
    //   $.ajax({
    //     url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/GetImage",
    //     method: "POST",
    //     timeout: 0,
    //     headers: {
    //       Accept: "application/json",
    //       "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
    //     },
    //     async: false,
    //     success: function (data) {
    //       result = data;
    //     },
    //   });
    //   return result;
    // },
    getImage: function () {
      let result = null;
      $.ajax({
        url: "https://7wda3149g7.execute-api.ap-northeast-1.amazonaws.com/dev/GetImages",
        method: "POST",
        timeout: 0,
        headers: {
          Accept: "application/json",
          "x-api-key": "WvaKUMz6q5aH6DtSdOWXO5HxIQnOrzfJ3apbIo4F",
        },
        async: false,
        success: function (data) {
          result = data["result"];
        },
      });
      return result;
    },
  });

  let results = $.getImage();
  results.sort(function (a, b) {
    return a.Number - b.Number;
  });
  console.log(`results = ${results}`);
  let l = results.length;

  for (let i = 0; i < l; i++) {
    const html = `
        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${results[i].Name}</h6>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">${results[i].Link}</p>
                <p class="text-xs text-secondary mb-0">MOXA</p>
            </td>
            <td class="align-middle text-center">
                <img src=${results[i].img_base64} width="20px" height="20px">
            </td>
            <td class="align-middle">
                <a href="javascript:deleteimg(${results[i].Id});" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Delete
                </a>
            </td>
        </tr>
		`;
    leadershipBoard.insertAdjacentHTML("afterbegin", html);
  }
};

//displayTriviaLeaderBoard();
displayMatchingGameLeaderBoard();
