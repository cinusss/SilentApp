const htmlElemnentComment = "svg[aria-label='Comment']";
const htmlElemnentCommentPL = "svg[aria-label='Skomentuj']";
const htmlElemnentSettings = "svg[aria-label='Options']";
const htmlElemnentSettingsPL = "svg[aria-label='Opcje']";
const baseInstagramUrl = 'https://www.instagram.com/';

function randomTime() {
  return 5000 + Math.floor(Math.random() * 10000);
}
function randomTimeBig() {
  return 15000 + Math.floor(Math.random() * 4000);
}
function randomTimeSmall() {
  return 2000 + Math.floor(Math.random() * 3000);
}

function createWholeLink(linkList) {
  const fullLinkList = [];
  linkList.forEach(shortUrl => {
    fullLinkList.push(baseInstagramUrl + shortUrl.link);
  });
  return fullLinkList;
}

export function createJsLink(linkList, modalOpen, instagramName) {
  if (modalOpen) {
    linkList = createWholeLink(linkList);
    let jsLink = '';
    let stringLinkList = '';
    linkList.forEach(link => {
      stringLinkList = stringLinkList + link + ',';
    });
    stringLinkList = stringLinkList.substring(0, stringLinkList.length - 1);
    linkList.forEach((link, index) => {
      if (index === 0 && linkList.length > 1) {
        jsLink =
          'window.onload = function() { const arrayOfLinks = "' +
          stringLinkList +
          '".split(","); let htmlElementLike = ""; let htmlElementUnlike = ""; let private = false; let privateLanguage = ""; let h2tags = document.querySelectorAll("h2"); const searchText = ["This Account is Private", "To konto jest prywatne"]; for(let i = 0; i < h2tags.length; i++){if(searchText.includes(h2tags[i].innerHTML)){ private = true; privateLanguage = h2tags[i].innerHTML;};}; if(window.location.href === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/" && document.querySelectorAll("' +
          htmlElemnentSettings +
          '").length == 0 && document.querySelectorAll("' +
          htmlElemnentSettingsPL +
          '").length == 0){window.location.href = "http://www.spaceofapps.com/";}else if(document.querySelectorAll("' +
          htmlElemnentComment +
          '").length > 0 || privateLanguage == "This Account is Private"){htmlElementLike = "svg[aria-label=\'Like\']"; htmlElementUnlike = "svg[aria-label=\'Unlike\']"}else if(document.querySelectorAll("' +
          htmlElemnentCommentPL +
          '").length > 0 || privateLanguage == "To konto jest prywatne"){htmlElementLike = "svg[aria-label=\'Lubię to!\']"; htmlElementUnlike = "svg[aria-label=\'Nie lubię\']";}; if(!arrayOfLinks.includes(window.location.href) && !private){setTimeout(function(){ window.location.href = "' +
          link +
          '";}, ' +
          randomTime() +
          ');}else if(window.location.href === "' +
          link +
          '" && document.querySelectorAll(htmlElementLike).length > 0){ let unlikeLenght = 0; setTimeout(function(){ unlikeLenght = document.querySelectorAll(htmlElementUnlike).length; document.querySelectorAll(htmlElementLike)[0].parentElement.click();}, ' +
          randomTime() +
          ');  setTimeout(function(){if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTimeSmall() +
          ');}else{  document.querySelectorAll(htmlElementLike)[0].parentElement.click();  if(document.querySelectorAll(htmlElementLike).length > unlikeLenght){setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTimeSmall() +
          ');}else{ setTimeout(function(){window.location.href = "http://silentapp.pl/";}, ' +
          randomTimeSmall() +
          ');}; }}, ' +
          randomTimeBig() +
          ');}else if((window.location.href === "' +
          link +
          '" || (private && (document.referrer === "' +
          linkList[index - 1] +
          '" || document.referrer === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/"))) && document.querySelectorAll(htmlElementLike).length == 0){ setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTime() +
          ');}';
      } else if (index === 0 && linkList.length === 1) {
        jsLink =
          'window.onload = function() { const arrayOfLinks = "' +
          stringLinkList +
          '".split(","); let htmlElementLike = ""; let htmlElementUnlike = ""; let private = false; let privateLanguage = ""; let h2tags = document.querySelectorAll("h2"); const searchText = ["This Account is Private", "To konto jest prywatne"]; for(let i = 0; i < h2tags.length; i++){if(searchText.includes(h2tags[i].innerHTML)){ private = true; privateLanguage = h2tags[i].innerHTML;};}; if(window.location.href === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/" && document.querySelectorAll("' +
          htmlElemnentSettings +
          '").length == 0 && document.querySelectorAll("' +
          htmlElemnentSettingsPL +
          '").length == 0){window.location.href = "http://www.spaceofapps.com/";}else if(document.querySelectorAll("' +
          htmlElemnentComment +
          '").length > 0 || privateLanguage == "This Account is Private"){htmlElementLike = "svg[aria-label=\'Like\']"; htmlElementUnlike = "svg[aria-label=\'Unlike\']"}else if(document.querySelectorAll("' +
          htmlElemnentCommentPL +
          '").length > 0 || privateLanguage == "To konto jest prywatne"){htmlElementLike = "svg[aria-label=\'Lubię to!\']"; htmlElementUnlike = "svg[aria-label=\'Nie lubię\']";}; if(!arrayOfLinks.includes(window.location.href) && !private){setTimeout(function(){ window.location.href = "' +
          link +
          '";}, ' +
          randomTime() +
          ');}else if(window.location.href === "' +
          link +
          '" && document.querySelectorAll(htmlElementLike).length > 0){let unlikeLenght = 0; setTimeout(function(){ unlikeLenght = document.querySelectorAll(htmlElementUnlike).length; document.querySelectorAll(htmlElementLike)[0].parentElement.click();}, ' +
          randomTime() +
          ');  setTimeout(function(){if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTimeSmall() +
          ');}else{  document.querySelectorAll(htmlElementLike)[0].parentElement.click(); if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTimeSmall() +
          ');}else{ setTimeout(function(){window.location.href = "http://silentapp.pl/";}, ' +
          randomTimeSmall() +
          ');}; }}, ' +
          randomTimeBig() +
          ');}else if((window.location.href === "' +
          link +
          '" || (private && (document.referrer === "' +
          linkList[index - 1] +
          '" || document.referrer === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/"))) && document.querySelectorAll(htmlElementLike).length == 0){ setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTimeSmall() +
          ');};}';
      } else if (index > 0 && linkList.length === index + 1) {
        jsLink =
          jsLink +
          'else if(window.location.href === "' +
          link +
          '" && document.querySelectorAll(htmlElementLike).length > 0){let unlikeLenght = 0; setTimeout(function(){ unlikeLenght = document.querySelectorAll(htmlElementUnlike).length; document.querySelectorAll(htmlElementLike)[0].parentElement.click();}, ' +
          randomTime() +
          ');  setTimeout(function(){if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){  setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTime() +
          ');}else{  document.querySelectorAll(htmlElementLike)[0].parentElement.click(); if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTimeSmall() +
          ');}else{ setTimeout(function(){window.location.href = "http://silentapp.pl/";}, ' +
          randomTimeSmall() +
          ');}; }}, ' +
          randomTimeBig() +
          ');}else if((window.location.href === "' +
          link +
          '" || (private && (document.referrer === "' +
          linkList[index - 1] +
          '" || document.referrer === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/"))) && document.querySelectorAll(htmlElementLike).length == 0){ setTimeout(function(){window.location.href = "https://www.google.com/";}, ' +
          randomTimeSmall() +
          ');}};';
      } else if (index > 0 && linkList.length !== index + 1) {
        jsLink =
          jsLink +
          'else if(window.location.href === "' +
          link +
          '" && document.querySelectorAll(htmlElementLike).length > 0){let unlikeLenght = 0; setTimeout(function(){unlikeLenght = document.querySelectorAll(htmlElementUnlike).length; document.querySelectorAll(htmlElementLike)[0].parentElement.click();}, ' +
          randomTime() +
          ');  setTimeout(function(){if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){  setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTime() +
          ');}else{  document.querySelectorAll(htmlElementLike)[0].parentElement.click(); if(document.querySelectorAll(htmlElementUnlike).length > unlikeLenght){setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTimeSmall() +
          ');}else{ setTimeout(function(){window.location.href = "http://silentapp.pl/";}, ' +
          randomTimeSmall() +
          ');}; }}, ' +
          randomTimeBig() +
          ');}else if((window.location.href === "' +
          link +
          '" || (private && (document.referrer === "' +
          linkList[index - 1] +
          '" || document.referrer === "https://www.instagram.com/' +
          instagramName.toLowerCase() +
          '/"))) && document.querySelectorAll(htmlElementLike).length == 0){ setTimeout(function(){window.location.href = "' +
          linkList[index + 1] +
          '";}, ' +
          randomTimeSmall() +
          ');}';
      }
    });
    return jsLink;
  }
}
