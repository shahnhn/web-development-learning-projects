const addBookmarkBtn=document.getElementById("add-button");
const bookmarkList=document.getElementById("bookmark-list");
const bookmarkNameInput=document.getElementById("bookmark-name");
const bookmarkURLInput=document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", LoadBookmarks);

addBookmarkBtn.addEventListener("click", function(){
    const name=bookmarkNameInput.value.trim();
    const url=bookmarkURLInput.value.trim();

    if(!name || !url){
        alert("Enter both name and URL");
        return;
    }
    else{
        if(!url.startsWith("http://") && !url.startsWith("https://")){
            alert("Enter valid URL");
            return;
        }

        addBookmark(name, url); 
        saveBookmark(name, url); 
        bookmarkNameInput.value="";
        bookmarkURLInput.value="";
    }
})

function addBookmark(name, url){
    const li=document.createElement("li");
    const link=document.createElement("a");
    link.href=url;
    link.textContent=name;
    link.target="_blank";

    const removeButton=document.createElement("button");
    removeButton.textContent="Remove";
    removeButton.addEventListener("click", function (){
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    })

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
}

function getBookmarksFromStorage(){
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url){
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({name, url});
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function LoadBookmarks(){
    const bookmarks=getBookmarksFromStorage();
    bookmarks.forEach((bookmark)=> addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url){
    const bookmarks=getBookmarksFromStorage();
    bookmarks=bookmarks.filter((bookmark)=>bookmark.name !== name || bookmark.url !== url)
}