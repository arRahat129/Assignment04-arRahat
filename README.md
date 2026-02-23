        *********************************************
                    Answers to Questions
        *********************************************

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ANSWER: 
    <!-- FINDING HTML ELEMENT BY ID NAME -->
    By using getElementById -> we can get an element which is unique. When we need to get an specific element that is not repeated in the file.
    <!-- FINDING HTML ELEMENT BY CLASS NAME -->
    By using getElementsByClassName -> we can get multiple element with the same class name. All elements will return inside a HTMLCollection similar to a list.
    <!-- FINDING HTML ELEMENT BY CSS SELECTOR (id, class, tag)-->
    By using querySelector -> we can get an element. There might be more element with the same class name or tag name. but it will return the first one among all those.
    <!-- FINDING HTML ELEMENT BY CSS SELECTOR (id, class, tag)-->
    By using querySelectorAll -> we can get multiple element via a NodeList. It gets all the element with the same CSS selector and place all of them in that list.


2. How do you create and insert a new element into the DOM?

ANSWER: 
    step:1 -> get the parent element inside which I want to insert my new element. 
        let parent = document.getElementById("parent-div");
    
    step:2 -> I will create a new HTML element. for example:
        let element = document.createElement("div");
    
    step:3 -> then add some content in the new created element.
        element.innerHTML = `
            <h1>New Element Added</h1>
            <p>Hey There!!</p>
        `
    
    step:4 -> then append the new element as a child to the parent element.
        parent.appendChild(element);

3. What is Event Bubbling? And how does it work?

ANSWER: 
    The process of moving towards most outer parent which will listen for the event from the inner element where the event was placed.

    When someone clicks an element where an event listener is placed. The event happens in the element first, then it moves upward to its parent, then it moves upward to the parent's parent. and this continuously happens until it reaches the document.
    Suppose I place an event listener on a button. the event bubbles up as:
        button > parentDiv > body > html > document

4. What is Event Delegation in JavaScript? Why is it useful?

ANSWER: 
    When someone adds event listener directly to one parent element instead of many child element. that is called event delegation. 

    It is useful because: 
        i. It makes the coding clear. No unnecessary event listener added. just putted the parent to listen the event then from the parent all childs can be accessed.

        ii. works for new elements which are added later inside that same parent. so no need to add event listener separately to the new adding elements.

        iii. Because the numbers of event listeners are reduced to only one parent listener, so this saves memory and make the process faster.

        iv. Easy to manage all element under the same parent.

5. What is the difference between preventDefault() and stopPropagation() methods?

ANSWER: 
    preventDefault() method Stops the browser’s default behavior. For any event, if it has a default action, then this method can cancel it. Like: clicking on submit button, prevents it from submitting the form. or click a link, prevent the link to follow the URL.

    stopPropagation() method is used to stop the event bubbling process. By which in between any middle parent element, this method stops the event from bubbling upward to parent's parent.

