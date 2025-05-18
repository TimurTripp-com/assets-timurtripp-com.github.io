//TimurTripp.com Script Sheet, 2.2.0 09/22/2013. For use only on TimurTripp.com. © 2013 TimurTripp.com
/* function fadeOutNav(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var headerElement = document.getElementById('header');
	document.getElementById('header').style.position = 'absolute';
	if(scrollTop <= 28){
		headerElement.style.position = 'absolute';
		headerElement.style.top = '0';
		headerElement.style.display = 'block';
		headerElement.style.opacity = 1.0;
		headerElement.style.zIndex = 1;
		headerElement.onmouseover = null;
		headerElement.onmouseout = null;
	} else if(scrollTop > 28){
		headerElement.style.position = 'fixed';
		headerElement.style.top = '-28px';
		headerElement.style.display = 'block';
		headerElement.style.opacity = 1.0;
		headerElement.style.zIndex = 1;
		headerElement.onmouseover = function(){document.getElementById('header').style.top = '0';};
		headerElement.onmouseout = function(){document.getElementById('header').style.top = '-28px';};
	}
}
window.onscroll = fadeOutNav;//Works only with compatible browsers. */

function setUpTabbedLists(){
	for(var i=0; i<document.getElementsByClassName('tabbedlist').length; i++){
		var tabbedList = document.getElementsByClassName('tabbedlist')[i];
		for(var j=0; j<tabbedList.getElementsByTagName('li').length; j++){
			var selectedOption = tabbedList.getElementsByTagName('li')[j];
			selectedOption.onclick = function(){changeOption(this.parentNode, this);};
			selectedOption.onmouseover = function(){if(this.className !== 'selectedtab'){this.parentNode.getElementsByClassName('selectedtab')[0].style.backgroundColor = '#0080FF';}};
		}
		tabbedList.onmouseout = function(){this.getElementsByClassName('selectedtab')[0].style.backgroundColor = '';};
		var firstOption = tabbedList.getElementsByTagName('li')[0];
		var lastOption = tabbedList.getElementsByTagName('li')[tabbedList.getElementsByTagName('li').length-1];
		var selectedOption = tabbedList.getElementsByClassName('selectedtab')[0];
		firstOption.style.borderTopLeftRadius = '16px';
		firstOption.style.borderBottomLeftRadius = '16px';
		lastOption.style.borderTopRightRadius = '16px';
		lastOption.style.borderBottomRightRadius = '16px';
		selectedOption.style.backgroundColor = '#5BACFA';
	}
}

function tabbedListChangeSelectedOption(tabbedList, selectedOption){
	tabbedList.getElementsByClassName('selectedtab')[0].style.backgroundColor = '';
	tabbedList.getElementsByClassName('selectedtab')[0].className = '';
	selectedOption.className = 'selectedtab';
}


function changeOption(tabbedList, selectedOption){
	if(selectedOption.className !== 'selectedtab'){
		if(tabChangedReturn = tabChanged(tabbedList, selectedOption) && tabChanged){
			tabbedListChangeSelectedOption(tabbedList, selectedOption);
		}
	}
}

function setUpSelectors(){
    for(var i=0; i<document.getElementsByClassName('selector').length; i++){
        var selectorElement = document.getElementsByClassName('selector')[i];
        var chosenOption = selectorElement.getElementsByClassName('chosenoption')[0].innerHTML;
        var selectedOption = selectorElement.getElementsByClassName('option'+chosenOption)[0];
        selectedOption.setAttribute('class', 'selectedoption');
        for(var j=0; j<selectorElement.getElementsByTagName('span').length; j++){
            selectorElement.getElementsByTagName('span')[j].addEventListener('click', function(e){
                if(this.className !== 'selectedoption'){
                    changeOptionSelector(this.parentNode, this.className.substr(6), this.parentNode.getElementsByClassName('chosenoption')[0].innerHTML);
                }
            }, false);
        }
        document.getElementById('bodydiv').addEventListener('mousedown', function(e){
            var clickTarget = e.target || e.srcElement;
            if(clickTarget.parentNode.className !== 'selector'){
                closeAllSelectors();
            }
        }, false);
    }
    selectorElement.addEventListener('click', function(e){
        var clickTarget = e.target || e.srcElement;
        if(clickTarget.tagName == 'SPAN'){
            toggleSelector(this);
        }
    }, false);
}

function closeAllSelectors(){
    for(var i=0; i<document.getElementsByClassName('selector').length; i++){
        var selectorElement = document.getElementsByClassName('selector')[i];
        if(selectorElement.style.borderWidth == '2px'){
            toggleSelector(selectorElement);
        }
    }
}
function toggleSelector(selectorElement){
    if(selectorElement.style.position == 'absolute'){
        selectorElement.style.position = '';
    } else {
        selectorElement.style.position = 'absolute';
    }
    if(selectorElement.style.backgroundColor == ''){
        selectorElement.style.backgroundColor = '#0080FF';
    } else {
        selectorElement.style.backgroundColor = '';
    }
    if(selectorElement.style.borderWidth == ''){
        selectorElement.style.borderWidth = '2px';
    } else {
        selectorElement.style.borderWidth = '';
    }
    for(var i=0; i<selectorElement.getElementsByTagName('span').length; i++){
        var listItemElement = selectorElement.getElementsByTagName('span')[i];
        if(listItemElement !== selectorElement.getElementsByClassName('chosenoption')[0]){
            if(listItemElement !== selectorElement.getElementsByClassName('selectedoption')[0]){
                if(listItemElement.style.display == 'block'){
                    listItemElement.style.display = 'none';
                } else {
                    listItemElement.style.display = 'block';
                }
            } else {
                if(listItemElement.style.borderColor == ''){
                    listItemElement.style.borderColor = '#58ACFA';
                } else {
                    listItemElement.style.borderColor = '';
                }
            }
            listItemElement.onmousedown;
        }
    }
}
function changeOptionSelector(selectorElement, chosenOption, previousChosenOption){
    if(chosenOption !== null){
        selectorElement.getElementsByClassName('selectedoption')[0].setAttribute('class', 'option'+previousChosenOption);
        selectorElement.getElementsByClassName('option'+previousChosenOption)[0].style.borderColor = '';
        selectorElement.getElementsByClassName('option'+previousChosenOption)[0].style.display = 'block';
        selectorElement.getElementsByClassName('option'+chosenOption)[0].setAttribute('class', 'selectedoption');
        selectorElement.getElementsByClassName('selectedoption')[0].style.borderColor = '#58ACFA';
        selectorElement.getElementsByClassName('selectedoption')[0].style.display = 'block';
        selectorElement.getElementsByClassName('chosenoption')[0].innerHTML = chosenOption;
        selectorChanged(selectorElement, parseInt(chosenOption));
    }
}
function selectorChanged(selectorElement, chosenOption){}