function readMore(button, text) {
    /*
    CHECK IF THE TEXT IS NOT DISPLAYED
    WHEN TRUE DISPLAY THE TEXT AND CHANGE THE BUTTON TEXT TO READ LESS
    WHEN FALSE REMOVE THE TEXT AND CHAMNGE THE BUTTON TEXT TO READ MORE
    */
    let clickedButton = button;
    let readText = text;
    if (getComputedStyle(text).display == "none") {
        readText.hidden = "";
        clickedButton.innerText = "סגור";
    } else {
        readText.hidden = "true"
        clickedButton.innerText = "קרא עוד";
    }
}
document.onload = (event) => {
// A FUNCTION TO PAIR READ MORE BUTTON TO THE RELEVANT ARTICLE
    function articleFinder(button) {
    //THIS FUNCTION SCANS THE PARENT ELEMENTS UNTILL THE RELEVANT ID OF THE SECTION IS FOUND
    let parentFinder = function(baseButton) {
        let baseElement = baseButton;
        let targetELement;
        function parentIterator(element) {
            if(element.id !== "") {
                targetELement =  element;;
            } else {
                parentIterator(element.parentElement);
            }
        }
        parentIterator(baseElement);
        return targetELement
        }
    // THIS FUNCTION SCANS DOWN FROM THE PARENT SECTION TO FIND THE ARTICLE TO EXPAND
    let childFinder = function(baseParent){
        let parentElement = baseParent;
        let targetArticle
        function childIterator(element) {
            let childrenList = element.children;
            for (let i = 0; i < childrenList.length; i++){
                if (childrenList[i].tagName === "ARTICLE" || childrenList[i].class === "expand") {   
                    targetArticle = childrenList[i]
                } else {
                    if (targetArticle != false) childIterator(childrenList[i]);
                }
            }
        }
        childIterator(parentElement)
        return targetArticle;
        
    }
        let article = childFinder(parentFinder(button));
        button.onclick = readMore.bind(null, button, article)
    }
                        //SCANNING FOR READ MORE BUTTONS AND THEIR ARTICLES
                        let readMoreButtonArray = Array.from(document.querySelectorAll(".read-more"));
                        for (let i = 0; i < readMoreButtonArray.length; i++){
                            articleFinder(readMoreButtonArray[i]); 
                        };


};
