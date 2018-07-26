// console.log("!!!!!!!!")
// $.ajax({
//   url: "https://jaiminisbox.com/reader/series/one-piece-2",
//   success: function (pageCode) {
//     console.log("OP CHECK CHAPTER CALLED");
//     // console.log(pageCode);
//     // str = pageCode.substring(0, 20);
//     // str = pageCode;
//     // console.log(str)
//     const toNodes = html => new DOMParser().parseFromString(pageCode, 'text/html').body.childNodes
//     var actual;
//     var full;
//     // console.log(pageCode)
//     actual = toNodes()
//     console.log(actual)
//     // console.log(actual)
//     full = actual[0].getRootNode();
//     console.log(full)
//     console.log(full.getElementsByClassName("title")[3].textContent.trim())
//   }
// });

// $.ajax({
//   type: 'GET',
//   url: 'https://jaiminisbox.com/reader/series/one-piece-2',
//   success: function(resp) {
//     console.log('simple')
//     console.log(resp.substring(0,30))
//   },
//   error: function() {

//   }
// });


let mangaArrList = []
let mangaNodeListFiltered = []

function getHTML(url, getItems, logSelectedManga){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      // var resp = request.responseText;
      // console.log('PURE JS')
      // console.log(resp.substring(0,50))
      // console.log(request.responseText)
      console.log(request.responseText.substring(0,50))
      if(getItems){
        // getHtmlCode(request.responseText)
        console.log(getHtmlCodeMangaStream(request.responseText, logSelectedManga))
      }
    } else {
      // We reached our target server, but it returned an error
      console.warn("SOMETHING WENT BAD TRY AGAIN")
    }
  };
  
  request.onerror = function() {
    // There was a connection error of some sort
  };
  
  request.send();
}

// getHTML('https://jaiminisbox.com/reader/series/one-piece-2');
// getHTML('https://jaiminisbox.com/reader/series/boruto-naruto-next-generations/');



// getHTML('https://www.mangareader.net/alphabetical');
getHTML('https://readms.net/manga', true, false);

// function getHtmlCode(response){
//   const toNodes = html => new DOMParser().parseFromString(response, 'text/html').body.childNodes
//   let pageCode = toNodes();
//   console.log(pageCode)
//   let full = pageCode[0].getRootNode();
//   let mangaNodeList = full.querySelectorAll("ul.series_alpha li")
//   console.log(mangaNodeList);
//   console.log(mangaNodeList.length);

//   let allMangas = []

//   for(let i = 0; i < mangaNodeList.length; i++){
//     allMangas.push(mangaNodeList[i].textContent)
//   }

//   console.log(allMangas)
//   console.log(allMangas.includes("one"))

//   // var el = allMangas.filter(a => a.toLowerCase().includes("one"));
//   // var el = allMangas.filter(a => a.length < 2);

//   // console.log(el)

//   mangaArrList = allMangas;
// }




function getHtmlCodeMangaStream(response, logSelectedManga){
  const toNodes = html => new DOMParser().parseFromString(response, 'text/html').body.childNodes
  let pageCode = toNodes();
  console.log(pageCode)
  let full = pageCode[0].getRootNode();
  let mangaNodeList = full.querySelectorAll(".table tr td")
  console.log(mangaNodeList);
  console.log(mangaNodeList.length);


  mangaNodeListFiltered = Array.prototype.slice.call(mangaNodeList).filter((item, i) => i % 2 == 0)
  console.log(mangaNodeListFiltered);

  let allMangas = []

  for(let i = 0; i < mangaNodeListFiltered.length; i++){
    allMangas.push(mangaNodeListFiltered[i].textContent)
  }
  
  // console.log(allMangas)
  // console.log(allMangas.includes("one"))

  // var el = allMangas.filter(a => a.toLowerCase().includes("one"));
  // var el = allMangas.filter(a => a.length < 2);

  // console.log(el)
  
  mangaArrList = allMangas;
  if(logSelectedManga){
    return mangaArrList;
  }
}


let searchField = document.getElementById("search")
let searchList = document.getElementById("searchList")
// searchField.addEventListener("change", () => {
//   console.log("CHANGED~~~")
// });


searchField.addEventListener('input', function (e) {
  // something(this.value);
  if(e.target.value.length <= 3){
    if(searchList.firstChild){
      while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
      }
    }
  }

  if(e.target.value.length > 3){
    console.log(e.target.value)

    while (searchList.firstChild) {
      searchList.removeChild(searchList.firstChild);
    }
    // var el = allMangas.filter(a => a.toLowerCase().includes("one"));
    let results = mangaArrList.filter(function(manga) {
      return manga.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0;
    });
    for(let i = 0; i < results.length; i++){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(results[i]));
      searchList.appendChild(li);
    }
    console.log(results)
  }

});


searchList.onclick = function(event) {
  console.log(event.target.textContent)
  let selectedItem = event.target.textContent
  let selectedItemAllData = Array.prototype.slice.call(mangaNodeListFiltered).filter((item) => item.textContent === selectedItem)
  let selectedItemPath = selectedItemAllData[0].querySelector("a").getAttribute('href')
  console.log(selectedItemPath)
  getHTML(`https://readms.net${selectedItemPath}`, true, true);

  // console.log(mangaArrList)
  // let results = mangaArrList.filter(function(manga) {
  //   return manga.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0;
  // });
};  































































// request.open('GET', 'https://jaiminisbox.com/reader/series/boruto-naruto-next-generations/', true);
// request.send();



// $.getJSON('https://jaiminisbox.com/reader/series/one-piece-2', function (data) {
//     debugger
//     console.log("222 CHECK CHAPTER CALLED");
//     console.log(data.contents)
//     console.log(data)
// });



// //$(".setup").addClass("dispBlock");
// if (!localStorage.oneTimeSetup) {
//     localStorage.oneTimeSetup = 1;
//     console.log("created local ONE TiME SEtUP");
// }
// if (!localStorage.oneTimeConfirm) {
//     localStorage.oneTimeConfirm = 0;
//     console.log("created local ONE TiME Confirm");
// }


// function oneTimeSetup() {
//     if (Number(localStorage.oneTimeSetup) == true) {
//         console.log("here");
//         chrome.browserAction.setBadgeText({
//             text: "0"
//         });
//         //        localStorage.oneTimeSetup = 0;
//         $(".setup").addClass("dispBlock");
//     }

//     if (Number(localStorage.oneTimeConfirm) == 1) {
//         //        $(".setup").addClass("dispBlock");
//         //        $(".setup").removeClass("dispBlock");
//         getNewManga();
//         console.log("!!!ONCE!!!");
//     }
// }
// if (!Number(localStorage.oneTimeConfirm) == 1) {
//     oneTimeSetup();
// } else {
//     getNewManga();
// }

// //             BUTTONS
// $(".confirm").on("click", function () {
//     $(".setup").removeClass("dispBlock");
//     localStorage.oneTimeConfirm = 1;
//     console.log("!!!ONCE!!!");
//     window.location.href = "popup.html";
//     //    getNewManga();
// });
// $(".reset").on("click", function () {
//     localStorage.clear();
//     console.log("LOCAL STORAGE CLEARED!!!");
//     window.location.href = "popup.html";
// });

// $(".refresh").on("click", function () {
//     window.location.href = "popup.html";
// });




// var abcd = "ABCDEF";
// console.log("start");
// var alOn = {
//     methodOn: function (e) {
//         chrome.alarms.create("5min", {
//             //            delayInMinutes: 0.1,
//             //            periodInMinutes: 0.2
//             delayInMinutes: 0.3,
//             periodInMinutes: 60
//         });
//     }
// };
// var alOff = {
//     methodOff: function (e) {
//         chrome.alarms.clear("5min");
//     }
// }
// var aa = document.getElementById('alarmOn');
// //console.log(aa);
// aa.addEventListener('click', function () {
//     alOn.methodOn();
//     console.log("ON alarm 5min turned");
// });
// var bb = document.getElementById('alarmOff');
// bb.addEventListener('click', function () {
//     alOff.methodOff();
//     console.log("OFF alarm 5min turned ");
// });

// function logToCon() {
//     console.log('++logToCon++');
// }









// if (localStorage.numberOfUnread) {

// } else {
//     localStorage.numberOfUnread = 0;
// }

// function numUnreadAdd() {
//     localStorage.numberOfUnread = Number(localStorage.numberOfUnread) + 1;
//     chrome.browserAction.setBadgeText({
//         text: String(localStorage.numberOfUnread)
//     });
// }

// function numUnreadSub() {
//     localStorage.numberOfUnread = localStorage.numberOfUnread - 1;
//     chrome.browserAction.setBadgeText({
//         text: String(localStorage.numberOfUnread)
//     });
// }

// function notification(name, chapter, img) {
//     chrome.notifications.create('reminder', {
//         type: 'basic',
//         iconUrl: img,
//         title: name,
//         message: chapter
//     }, function () {});
// }

// if (localStorage.a) {
//     console.log("add 1 to \"a\"");
//     localStorage.a = Number(localStorage.a) + 1;
// } else {
//     console.log("creating 'a'");
//     localStorage.a = 0;
// }
// console.log(localStorage.a);



// //=========================================================================





// function getNewManga() {
//     // $('.TDG').removeClass("dispNone");
//     // if (localStorage.TDG) {
//     //     console.log("TDG exists");
//     // } else {
//     //     console.log("creating 'TDG'");
//     //     localStorage.TDG = "-";
//     // }
//     // var listOfTDGChap = document.querySelector('.TDGchapterList');
//     // var storedValuesTDG = window.localStorage.localTDG;
//     // if (!storedValuesTDG) {
//     //     listOfTDGChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
//     //     storeTDG();
//     // } else {
//     //     listOfTDGChap.innerHTML = storedValuesTDG;
//     // }
//     // $(".TDGchapterList").on("click", "li", function () {
//     //     $(this).toggleClass("completed");
//     //     if ($(this).text() !== "No new Manga") {
//     //         if ($(this).hasClass("completed")) {
//     //             numUnreadSub();
//     //         } else {
//     //             numUnreadAdd();
//     //         }
//     //     }
//     //     storeTDG();
//     // });
//     // $(".TDGchapterList").on("click", ".open", function (event) {
//     //     $(this).parent().fadeIn(0, function () {
//     //         chrome.tabs.create({
//     //             url: $(this).attr('href'),
//     //             active: false
//     //         }, callback);

//     //         function callback(data) {
//     //             console.log(data);
//     //         }
//     //     });
//     //     storeOP();
//     //     event.stopPropagation();
//     // });
//     // $(".TDGchapterList").on("click", ".rev", function (event) {
//     //     $(this).parent().fadeOut(0, function () {
//     //         if ($(this).text() !== "No new Manga" && !($(this).hasClass("completed"))) {
//     //             numUnreadSub();
//     //         }
//     //         $(this).remove();
//     //     });
//     //     console.log(listOfTDGChap);
//     //     if (listOfTDGChap.innerHTML == "") {
//     //         listOfTDGChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "<a href='http://hatigarmscans.eu/hs/series/tales-of-demons-and-gods/'><span class='open'><i class='fa fa-share'></i></span></a></li>";
//     //     }
//     //     storeTDG();
//     //     event.stopPropagation();
//     // });
//     // $(".addToListTDG").keypress(function (event) {
//     //     if (event.which === 13) {
//     //         var text = $(this).val();
//     //         $(this).val("");
//     //         if ($('.TDGchapterList li').first().text() == "No new Manga") {
//     //             console.log("++++++++++++++++");
//     //             $('.TDGchapterList li').first().remove();
//     //         }
//     //         if (text != "") {
//     //             $(".TDGchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='http://hatigarmscans.eu/hs/series/tales-of-demons-and-gods/'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//     //             //            $(".TDGchapterList").append("<li><span><i class='fa fa-trash'></i> </span>" + text + "</li>");
//     //         } else {
//     //             alert("Enter a to do!");
//     //         }
//     //         numUnreadAdd();
//     //         storeTDG();
//     //     }
//     // })
//     // $(".TDG").on("click", function () {
//     //     $(".addToListTDG").fadeToggle(200);
//     // })

//     // function storeTDG() {
//     //     window.localStorage.localTDG = listOfTDGChap.innerHTML;
//     // }
//     // $.ajax({
//     //     url: "http://hatigarmscans.eu/hs/series/tales-of-demons-and-gods/",
//     //     success: function (pageCode) {
//     //         console.log("TDG CHECH CHAPTER CALLED");
//     //         var newChapterTDG = "";
//     //         var linkTDG = pageCode;
//     //         linkTDG = linkTDG.match('title"><a href="(.*)\" ');
//     //         newChapterTDG = pageCode.match("Vol.1 (.*)\">");
//     //         console.log("print new Manga - " + newChapterTDG[1]);
//     //         if (localStorage.TDG == newChapterTDG[1]) {
//     //             console.log("No new Manga");
//     //             if ($('.TDGchapterList li').first().text() == "No new Manga" && !$('.TDGchapterList').length == 1) {
//     //                 console.log("++++++++++++++++");
//     //                 $('.TDGchapterList li').first().remove();
//     //             }
//     //             $('.TDGchapterList li').first().addClass("fade")
//     //             storeTDG();
//     //         } else {
//     //             console.log("New Manga!!!");
//     //             localStorage.setItem("TDG", newChapterTDG[1]);
//     //             numUnreadAdd();
//     //             if ($('.TDGchapterList li').first().text() == "No new Manga") {
//     //                 console.log("++++++++++++++++");
//     //                 $('.TDGchapterList li').first().remove();
//     //             }
//     //             $(".TDGchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterTDG[1] + "<a href='" + linkTDG[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");
//     //             storeTDG();
//     //         }
//     //         $('.TDGchapterList li').first().removeClass("fade")
//     //         $('.TDG').addClass("dispNone");
//     //     }
//     // });






//     //=========================================================================
//     //                          ONE PIECE
//     //=========================================================================
//     $('.TDG').removeClass("dispNone");
//     if (localStorage.OP) {
//         console.log("OP exists");
//     } else {
//         console.log("creating 'OP'");
//         localStorage.OP = "-";
//     }


//     var listOfOpChap = document.querySelector('.OPchapterList');
//     var storedValuesOP = window.localStorage.localOP;
//     if (!storedValuesOP) {
//         listOfOpChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
//         storeOP();
//     } else {
//         listOfOpChap.innerHTML = storedValuesOP;
//     }
//     $(".OPchapterList").on("click", "li", function () {
//         $(this).toggleClass("completed");
//         if ($(this).text() !== "No new Manga") {
//             if ($(this).hasClass("completed")) {
//                 numUnreadSub();
//             } else {
//                 numUnreadAdd();
//             }
//         }

//         storeOP();
//     });

//     $(".OPchapterList").on("click", ".open", function (event) {
//         $(this).parent().fadeIn(0, function () {
//             chrome.tabs.create({
//                 url: $(this).attr('href'),
//                 active: false
//             }, callback);

//             function callback(data) {
//                 console.log(data);
//             }
//         });
//         storeOP();
//         event.stopPropagation();
//     });
//     $(".OPchapterList").on("click", ".rev", function (event) {
//         $(this).parent().fadeOut(0, function () {
//             if ($(this).text() !== "No new Manga" && !($(this).hasClass("completed"))) {
//                 numUnreadSub();
//             }
//             $(this).remove();
//         });
//         console.log(listOfOpChap);
//         if (listOfOpChap.innerHTML == "") {
//             listOfOpChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "<a href='https://jaiminisbox.com/reader/series/one-piece-2'><span class='open'><i class='fa fa-share'></i></span></a></li>";
//         }

//         storeOP();
//         event.stopPropagation();
//     });
//     $(".addToListOP").keypress(function (event) {
//         if (event.which === 13) {
//             var text = $(this).val();
//             $(this).val("");
//             if ($('.OPchapterList li').first().text() == "No new Manga") {
//                 console.log("++++++++++++++++");
//                 $('.OPchapterList li').first().remove();
//             }
//             if (text != "") {
//                 $(".OPchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='https://jaiminisbox.com/reader/series/one-piece-2'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//             } else {
//                 alert("Enter a to do!");
//             }
//             numUnreadAdd();
//             storeOP();
//         }
//     })
//     $(".OP").on("click", function () {
//         $(".addToListOP").fadeToggle(200);
//     })

//     function storeOP() {
//         window.localStorage.localOP = listOfOpChap.innerHTML;
//     }


//     // ONE PIECE
//     $.ajax({
//         url: "https://jaiminisbox.com/reader/series/one-piece-2",
//         success: function (pageCode) {
//             console.log("OP CHECK CHAPTER CALLED");
//             var newChapterOP = "";
//             newChapterOP = pageCode.match('div class="title"><a (.*)/a></div>');
//             var linkOP = newChapterOP[1];
//             linkOP = linkOP.match('\"(.*)\" ');
//             newChapterOP = newChapterOP[1].match('\">(.*)<');
//             console.log("new chapter - " + newChapterOP[1]);
//             console.log("link - " + linkOP[1]);
//             console.log("print new Manga - " + newChapterOP[1]);
//             if (localStorage.OP == newChapterOP[1]) {
//                 console.log("No new Manga");
//                 if ($('.OPchapterList li').first().text() == "No new Manga" && !$('.OPchapterList').length == 1) {
//                     console.log("++++++++++++++++");
//                     $('.OPchapterList li').first().remove();
//                 }
//                 $('.OPchapterList li').first().addClass("fade")
//                 storeOP();

//             } else {
//                 console.log("New Manga!!!");
//                 localStorage.setItem("OP", newChapterOP[1]);
//                 numUnreadAdd();

//                 if ($('.OPchapterList li').first().text() == "No new Manga") {
//                     console.log("++++++++++++++++");
//                     $('.OPchapterList li').first().remove();
//                 }
//                 //            $(".OPchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='https://jaiminisbox.com/reader/series/one-piece-2'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//                 $(".OPchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterOP[1] + "<a href='" + linkOP[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

//                 storeOP();
//             }
//             $('.OPchapterList li').first().removeClass("fade")
//             $('.OP').addClass("dispNone");
//             //            console.log("/////////////");
//             //            console.log($('.OPchapterList li').removeClass("fade"));
//             //            console.log("/////////////");

//         }
//     });
//     //=========================================================================
//     //                          ONE PUNCH MAN
//     //=========================================================================
//     $('.TDG').removeClass("dispNone");
//     if (localStorage.OPM) {
//         console.log("OPM exists");
//     } else {
//         console.log("creating 'OPM'");
//         localStorage.OPM = "-";
//     }

//     var listOfOPMChap = document.querySelector('.OPMchapterList');
//     var storedValuesOPM = window.localStorage.localOPM;
//     if (!storedValuesOPM) {
//         listOfOPMChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
//         storeOPM();
//     } else {
//         listOfOPMChap.innerHTML = storedValuesOPM;
//     }
//     $(".OPMchapterList").on("click", "li", function () {
//         $(this).toggleClass("completed");
//         if ($(this).text() !== "No new Manga") {
//             if ($(this).hasClass("completed")) {
//                 numUnreadSub();
//             } else {
//                 numUnreadAdd();
//             }
//         }

//         storeOPM();
//     });
//     $(".OPMchapterList").on("click", ".open", function (event) {
//         $(this).parent().fadeIn(0, function () {
//             chrome.tabs.create({
//                 url: $(this).attr('href'),
//                 active: false
//             }, callback);

//             function callback(data) {
//                 console.log(data);
//             }
//         });
//         storeOPM();
//         event.stopPropagation();
//     });
//     $(".OPMchapterList").on("click", ".rev", function (event) {
//         $(this).parent().fadeOut(0, function () {
//             if ($(this).text() !== "No new Manga" && !($(this).hasClass("completed"))) {
//                 numUnreadSub();
//             }
//             $(this).remove();
//         });
//         console.log(listOfOPMChap);
//         if (listOfOPMChap.innerHTML == "") {
//             listOfOPMChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "<a href='https://readms.net/manga/onepunch_man'><span class='open'><i class='fa fa-share'></i></span></a></li>";
//         }

//         storeOPM();
//         event.stopPropagation();
//     });
//     $(".addToListOPM").keypress(function (event) {
//         if (event.which === 13) {
//             var text = $(this).val();
//             $(this).val("");
//             if ($('.OPMchapterList li').first().text() == "No new Manga") {
//                 console.log("++++++++++++++++");
//                 $('.OPMchapterList li').first().remove();
//             }
//             if (text != "") {
//                 $(".OPMchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='https://readms.net/manga/onepunch_man'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//             } else {
//                 alert("Enter a to do!");
//             }
//             numUnreadAdd();
//             storeOPM();
//         }
//     })
//     $(".OPM").on("click", function () {
//         $(".addToListOPM").fadeToggle(200);
//     })

//     function storeOPM() {
//         window.localStorage.localOPM = listOfOPMChap.innerHTML;
//     }


//     // ONE PUNCH MAN
//     $.ajax({
//         url: "https://readms.net/manga/onepunch_man",
//         success: function (pageCode) {
//             console.log("OPM CHECK CHAPTER CALLED");
//             var newChapterOPM = "";
//             newChapterOPM = pageCode.match('<td>(.*)</td>');
//             var linkOPM = newChapterOPM[1];
//             linkOPM = linkOPM.match('href="(.*)\">');
//             linkOPM[1] = "https://readms.net" + linkOPM[1];
//             newChapterOPM = newChapterOPM[1].match('\">(.*)<');
//             console.log("new chapter - " + newChapterOPM[1]);
//             console.log("link - " + linkOPM[1]);
//             if (localStorage.OPM == newChapterOPM[1]) {
//                 console.log("No new Manga");
//                 if ($('.OPMchapterList li').first().text() == "No new Manga" && !$('.OPMchapterList').length == 1) {
//                     console.log("++++++++++++++++");
//                     $('.OPMchapterList li').first().remove();
//                 }
//                 $('.OPMchapterList li').first().addClass("fade")
//                 storeOPM();

//             } else {
//                 console.log("New Manga!!!");
//                 localStorage.setItem("OPM", newChapterOPM[1]);
//                 numUnreadAdd();

//                 if ($('.OPMchapterList li').first().text() == "No new Manga") {
//                     console.log("++++++++++++++++");
//                     $('.OPMchapterList li').first().remove();
//                 }
//                 $(".OPMchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterOPM[1] + "<a href='" + linkOPM[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

//                 storeOPM();
//             }
//             $('.OPMchapterList li').first().removeClass("fade")
//             $('.OPM').addClass("dispNone");
//             //            console.log($('.OPMchapterList li').removeClass("fade"));
//         }
//     });
//     //=========================================================================
//     //                          ATTACK ON TITAN
//     //=========================================================================
//     $('.TDG').removeClass("dispNone");
//     if (localStorage.AOT) {
//         console.log("AOT exists");
//     } else {
//         console.log("creating 'AOT'");
//         localStorage.AOT = "-";
//     }

//     var listOfAOTChap = document.querySelector('.AOTchapterList');
//     var storedValuesAOT = window.localStorage.localAOT;
//     if (!storedValuesAOT) {
//         listOfAOTChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
//         storeAOT();
//     } else {
//         listOfAOTChap.innerHTML = storedValuesAOT;
//     }
//     $(".AOTchapterList").on("click", "li", function () {
//         $(this).toggleClass("completed");
//         if ($(this).text() !== "No new Manga") {
//             if ($(this).hasClass("completed")) {
//                 numUnreadSub();
//             } else {
//                 numUnreadAdd();
//             }
//         }

//         storeAOT();
//     });
//     $(".AOTchapterList").on("click", ".open", function (event) {
//         $(this).parent().fadeIn(0, function () {
//             chrome.tabs.create({
//                 url: $(this).attr('href'),
//                 active: false
//             }, callback);

//             function callback(data) {
//                 console.log(data);
//             }
//         });
//         storeAOT();
//         event.stopPropagation();
//     });
//     $(".AOTchapterList").on("click", ".rev", function (event) {
//         $(this).parent().fadeOut(0, function () {
//             if ($(this).text() !== "No new Manga" && !($(this).hasClass("completed"))) {
//                 numUnreadSub();
//             }
//             $(this).remove();
//         });
//         console.log(listOfAOTChap);
//         if (listOfAOTChap.innerHTML == "") {
//             listOfAOTChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "<a href='https://readms.net/manga/attack_on_titan'><span class='open'><i class='fa fa-share'></i></span></a></li>";
//         }

//         storeAOT();
//         event.stopPropagation();
//     });
//     $(".addToListAOT").keypress(function (event) {
//         if (event.which === 13) {
//             var text = $(this).val();
//             $(this).val("");
//             if ($('.AOTchapterList li').first().text() == "No new Manga") {
//                 console.log("++++++++++++++++");
//                 $('.AOTchapterList li').first().remove();
//             }
//             if (text != "") {
//                 $(".AOTchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='https://readms.net/manga/attack_on_titan'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//             } else {
//                 alert("Enter a to do!");
//             }
//             numUnreadAdd();
//             storeAOT();
//         }
//     })
//     $(".AOT").on("click", function () {
//         $(".addToListAOT").fadeToggle(200);
//     })

//     function storeAOT() {
//         window.localStorage.localAOT = listOfAOTChap.innerHTML;
//     }
//     // 					ATTACK ON TITAN
//     $.ajax({
//         url: "https://readms.net/manga/attack_on_titan",
//         success: function (pageCode) {
//             console.log("AOT CHECK CHAPTER CALLED");
//             var newChapterAOT = "";
//             newChapterAOT = pageCode.match('<td>(.*)</td>');
//             var linkAOT = newChapterAOT[1];
//             linkAOT = linkAOT.match('href="(.*)\">');
//             linkAOT[1] = "https://readms.net" + linkAOT[1];
//             newChapterAOT = newChapterAOT[1].match('\">(.*)<');
//             console.log("new chapter - " + newChapterAOT[1]);
//             console.log("link - " + linkAOT[1]);
//             if (localStorage.AOT == newChapterAOT[1]) {
//                 console.log("No new Manga");
//                 if ($('.AOTchapterList li').first().text() == "No new Manga" && !$('.AOTchapterList').length == 1) {
//                     console.log("++++++++++++++++");
//                     $('.AOTchapterList li').first().remove();
//                 }
//                 $('.AOTchapterList li').first().addClass("fade")
//                 storeAOT();

//             } else {
//                 console.log("New Manga!!!");
//                 localStorage.setItem("AOT", newChapterAOT[1]);
//                 numUnreadAdd();

//                 if ($('.AOTchapterList li').first().text() == "No new Manga") {
//                     console.log("++++++++++++++++");
//                     $('.AOTchapterList li').first().remove();
//                 }
//                 $(".AOTchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterAOT[1] + "<a href='" + linkAOT[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

//                 storeAOT();
//             }
//             $('.AOTchapterList li').first().removeClass("fade")
//             $('.AOT').addClass("dispNone");
//         }
//     });

//     // //=========================================================================
//     // //                           Against the Gods
//     // //=========================================================================
//     // $('.ATG').removeClass("dispNone");
//     // if (localStorage.ATG) {
//     //     console.log("ATG exists");
//     // } else {
//     //     console.log("creating 'ATG'");
//     //     localStorage.ATG = "-";
//     // }

//     // var listOfATGChap = document.querySelector('.ATGchapterList');
//     // var storedValuesATG = window.localStorage.localATG;
//     // if (!storedValuesATG) {
//     //     listOfATGChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new novel chapter" + "</li>";
//     //     storeATG();
//     // } else {
//     //     listOfATGChap.innerHTML = storedValuesATG;
//     // }
//     // $(".ATGchapterList").on("click", "li", function () {
//     //     $(this).toggleClass("completed");
//     //     if ($(this).text() !== "No new novel chapter") {
//     //         if ($(this).hasClass("completed")) {
//     //             numUnreadSub();
//     //         } else {
//     //             numUnreadAdd();
//     //         }
//     //     }

//     //     storeATG();
//     // });
//     // $(".ATGchapterList").on("click", ".open", function (event) {
//     //     $(this).parent().fadeIn(0, function () {
//     //         chrome.tabs.create({
//     //             url: $(this).attr('href'),
//     //             active: false
//     //         }, callback);

//     //         function callback(data) {
//     //             console.log(data);
//     //         }
//     //     });
//     //     storeATG();
//     //     event.stopPropagation();
//     // });
//     // $(".ATGchapterList").on("click", ".rev", function (event) {
//     //     $(this).parent().fadeOut(0, function () {
//     //         if ($(this).text() !== "No new novel chapter" && !($(this).hasClass("completed"))) {
//     //             numUnreadSub();
//     //         }
//     //         $(this).remove();
//     //     });
//     //     console.log(listOfAOTChap);
//     //     if (listOfATGChap.innerHTML == "") {
//     //         listOfATGChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new novel chapter" + "<a http://www.wuxiaworld.com/category/atg-chapter-release/'><span class='open'><i class='fa fa-share'></i></span></a></li>";
//     //     }

//     //     storeATG();
//     //     event.stopPropagation();
//     // });
//     // $(".addToListATG").keypress(function (event) {
//     //     if (event.which === 13) {
//     //         var text = $(this).val();
//     //         $(this).val("");
//     //         if ($('.ATGchapterList li').first().text() == "No new novel chapter") {
//     //             console.log("++++++++++++++++");
//     //             $('.ATGchapterList li').first().remove();
//     //         }
//     //         if (text != "") {
//     //             $(".ATGchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='http://www.wuxiaworld.com/category/atg-chapter-release/'><span class='open'><i class='fa fa-share'></i></span></a></li>");
//     //         } else {
//     //             alert("Enter a to do!");
//     //         }
//     //         numUnreadAdd();
//     //         storeATG();
//     //     }
//     // })
//     // $(".ATG").on("click", function () {
//     //     $(".addToListATG").fadeToggle(200);
//     // })

//     // function storeATG() {
//     //     window.localStorage.localATG = listOfATGChap.innerHTML;
//     // }
//     // // 					Against the Gods

//     // var feed = "http://www.wuxiaworld.com/category/atg-chapter-release/feed";
//     // $.ajax(feed, {
//     //     accepts: {
//     //         xml: "application/rss+xml"
//     //     },
//     //     dataType: "xml",
//     //     success: function (data) {
//     //         console.log("ATG NOVEL CHAPTER CALLED");
//     //         var newestNovelATG = '';
//     //         var linkATG = '';
//     //         $(data).find("item").each(function () { // or "item" or whatever suits your feed
//     //             var el = $(this);
//     //             newestNovelATG = el.find("title").text();
//     //             linkATG = el.find("link").text();
//     //             console.log(newestNovelATG);
//     //             link = el.find("link").text();
//     //             return false;
//     //         });
//     //         if (localStorage.ATG == newestNovelATG) {
//     //             console.log("No new novel chapter");
//     //             if ($('.ATGchapterList li').first().text() == "No new novel chapter" && !$('.ATGchapterList').length == 1) {
//     //                 console.log("++++++++++++++++");
//     //                 $('.ATGchapterList li').first().remove();
//     //             }
//     //             $('.ATGchapterList li').first().addClass("fade")
//     //             storeATG();
//     //         } else {
//     //             console.log("New novel!!!");
//     //             localStorage.setItem("ATG", newestNovelATG);
//     //             numUnreadAdd();

//     //             if ($('.ATGchapterList li').first().text() == "No new novel chapter") {
//     //                 console.log("++++++++++++++++");
//     //                 $('.ATGchapterList li').first().remove();
//     //             }
//     //             $(".ATGchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newestNovelATG + "<a href='" + linkATG + "'><span class='open'><i class='fa fa-share'></i></a></li>");

//     //             storeATG();
//     //         }
//     //         $('.ATGchapterList li').first().removeClass("fade")
//     //         $('.ATG').addClass("dispNone");
//     //     }
//     // });
// }





// console.log("FINISHED")