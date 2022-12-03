"use strict";

function submitImage() {
  let name = document.getElementById("imgName").value;
  let number = document.getElementById("imgNumber").value;
  let link = document.getElementById("imgLink").value;
  let imgbase64 = document.getElementById("imgBase64").value;
  console.log(name);
  var settings = {
    url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/StoreImage",
    method: "POST",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
    },
    data: JSON.stringify({
      Name: name,
      Link: link,
      Number: number,
      img_base64: imgbase64,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  document.getElementById("imgName").value = "";
  document.getElementById("imgNumber").value = "";
  document.getElementById("imgLink").value = "";
  document.getElementById("imgBase64").value = "";
}

let leadershipBoard = document.querySelector(".leadership-board");
let pfp = [
  "👴",
  "🧓",
  "👵",
  "👧",
  "🧒",
  "🧑",
  "👳",
  "🤴",
  "👼",
  "👩‍🦳",
  "👨",
  "👰",
  "👨‍🦰",
  "👩‍🦰",
  "👩‍🦲",
  "👱‍",
];

// Raffle
function shuffleArray(inputArray) {
  inputArray.sort(() => Math.random() - 0.5);
}

const displayMatchingGameLeaderBoard = function (list, sort = false) {
  jQuery.extend({
    getImage: function () {
      let result = null;
      $.ajax({
        url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/GetImage",
        method: "POST",
        timeout: 0,
        headers: {
          Accept: "application/json",
          "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
        },
        async: false,
        success: function (data) {
          result = data;
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
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">${results[i].Number}</span>
            </td>
            <td class="align-middle text-center">
                <img src=${results[i].img_base64} width="20px" height="20px">
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Edit
                </a>
            </td>
        </tr>
		`;
    leadershipBoard.insertAdjacentHTML("afterbegin", html);
  }
};

//displayTriviaLeaderBoard();
displayMatchingGameLeaderBoard();