//JavaScript for Find the Picture 2.0.1, http://www.timurtripp.com/Find-the-Picture.php
//(C) 2011-2014 TimurTripp.com

function setGame(gameTable){
	window.correctNum = Math.floor(Math.random()*gameTable.squareAmount);
	window.incorrectClicks = 0;
	window.correctClicks = 0;
	window.clickedSquare = null;
}

function getCorrectNum(){
	return window.correctNum;
}

function setCorrectSquare(gameSquare){
	window.correctSquare = gameSquare;
	window.correctNum = 0;
}

function getCorrectSquare(){
	return window.correctSquare;
}

function getIncorrectClicks(){
	return window.incorrectClicks;
}

function getCorrectClicks(){
	return window.correctClicks;
}

function getClicks(){
	return getIncorrectClicks()+getCorrectClicks();
}

function incorrectClicksAdd1(){
	window.incorrectClicks += 1;
}

function correctClicksAdd1(){
	window.correctClicks += 1;
}

function setGameTable(gameTable){
	window.gameTableObj = gameTable;
}

function getGameTable(){
	if(window.gameTableObj == null){
		return new gameTable(0,0);
	}
	return window.gameTableObj;
}

function setClickedSquare(gameSquare){
	window.clickedSquare = gameSquare;
}

function getClickedSquare(){
	return window.clickedSquare;
}

function gameSquare(gameSquare){
	this.gameSquare = gameSquare;
	this.className = 'gamesquare';
	this.id = '';
	if(this.gameSquare.className !== null && this.gameSquare.className !== ''){
		this.className = this.gameSquare.className;
	} else {
		this.gameSquare.className = this.className;
	}
	if(this.gameSquare.id !== null && this.gameSquare.id !== ''){
		this.id = this.gameSquare.id;
	} else {
		this.gameSquare.id = this.id;
	}
}

gameSquare.prototype.setClassName = function(className){
	this.className = className;
	this.gameSquare.className = this.className;
};

gameSquare.prototype.setId = function(id){
	this.id = id;
	this.gameSquare.id = this.id;
};

gameSquare.prototype.activateSquare = function(){
	this.gameSquare.onmousedown = function(){if(getClickedSquare() !== null){checkSquare();} else {setClickedSquare(new gameSquare(this)); getClickedSquare().checkSquare();}};
	this.gameSquare.style.cursor = 'pointer';
};

gameSquare.prototype.deactivateSquare = function(){
	this.gameSquare.onmousedown = null;
	this.gameSquare.onmouseup = null;
	this.gameSquare.onmouseout = null;
	this.gameSquare.style.cursor = '';
};

gameSquare.prototype.changeImg = function(className){
	if(this.gameSquare.style.backgroundSize == null){
		this.setClassName(className+'LoRes');
	} else {
		this.setClassName(className);
	}
};

gameSquare.prototype.checkSquare = function(){
	this.setId('clickedsquare');
	this.gameSquare.onmouseup = function(){checkSquare();};
	this.gameSquare.onmouseout = function(){checkSquare();};
	if(getCorrectSquare().gameSquare == this.gameSquare){
		this.correctSquare = true;
		this.changeImg('correct');
		return true;
	} else {
		this.changeImg('incorrect');
		return false;
	}
};

function gameTable(xAmount, yAmount){
	this.gameTable = document.getElementById('gametable');
	if(isNaN(parseInt(xAmount))){xAmount = makeParseIntWork(xAmount);}
	if(isNaN(parseInt(yAmount))){yAmount = makeParseIntWork(yAmount);}
	if(xAmount == ''){xAmount = 0;} else {xAmount = parseInt(xAmount);}
	if(yAmount == ''){yAmount = 0;} else {yAmount = parseInt(yAmount);}
	if(xAmount == 0){xAmount = 5;}
	if(yAmount == 0){yAmount = 3;}
	this.xAmount = xAmount;
	this.yAmount = yAmount;
	this.squareAmount = this.xAmount*this.yAmount;
	this.currentRow = null;
	this.currentRowNumber = 0;
	this.currentSquareNumber = 0;
}

gameTable.prototype.insertRow = function(){
	this.currentRow = this.gameTable.insertRow(-1);
	this.currentRowNumber +=1;
};

gameTable.prototype.insertCell = function(){
	var currentCell = new gameSquare(this.currentRow.insertCell(-1));
	currentCell.activateSquare();
	if(this.currentSquareNumber == getCorrectNum()){
		setCorrectSquare(currentCell);
	}
	this.currentSquareNumber++;
};

gameTable.prototype.insertLetterRow = function(){
	var letterRow = this.gameTable.insertRow(-1);
	var letterCell = letterRow.insertCell(-1);
	letterCell.className = 'horisontal';
	for(var i=0; i<this.xAmount; i++){
		var letterCell = letterRow.insertCell(-1);
		letterCell.className = 'horisontal';
		letterCell.innerHTML = numberToLetter(i);
	}
	var letterCell = letterRow.insertCell(-1);
	letterCell.className = 'horisontal';
};

gameTable.prototype.insertNumberCell = function(){
	var numberCell = this.currentRow.insertCell(-1);
	numberCell.className = 'vertical';
	numberCell.innerHTML = this.currentRowNumber;
};

function numberToLetter(number){
	var letterCount = 0;
	var addOnLetter = '';
	while(number > 25){
		number -= 26;
		letterCount++;
	}
	if(letterCount > 0){
		addOnLetter = numberToLetter(letterCount-1);
	}
	return addOnLetter+String.fromCharCode(97+number).toUpperCase();
}

function makeParseIntWork(str){
	var outputStr = '';
	var numbers = '1234567890';
	for(var i=0; i<str.length; i++){
		if(numbers.indexOf(str.substr(i, i+1)) !== -1){
			outputStr = str.substr(i, i+1);
		}
	}
	return outputStr;
}

function newGameTable(gameTable){
	tabbedListChangeSelectedOption(document.getElementById('xselect'), document.getElementById('xoption'+gameTable.xAmount));
	document.getElementById('yamount').value = gameTable.yAmount;
	gameTable.gameTable.innerHTML = '';
	gameTable.insertLetterRow();
	for(var i=0; i<gameTable.yAmount; i++){
		gameTable.insertRow();
		gameTable.insertNumberCell();
		for(var j=0; j<gameTable.xAmount; j++){
			gameTable.insertCell();
		}
		gameTable.insertNumberCell();
	}
	gameTable.insertLetterRow();
	setGameTable(gameTable);
}

function resetGame(gameTable){
	setGame(gameTable);
	newGameTable(gameTable);
	document.getElementById('clickeddisplay').innerText = (getGameTable().squareAmount) + ' of '+getGameTable().squareAmount;
	document.getElementById('founddisplay').style.display = 'none';
	document.getElementById('notfounddisplay').style.display = 'block';
	document.getElementById('incorrectdisplay').innerText = '0 of '+(getGameTable().squareAmount-1);
	var onBoardStatus = document.getElementById('onboardstatus');
	onBoardStatus.style.display = 'none';
	onBoardStatus.style.top = '88px';
	onBoardStatus.style.bottom = '';
}

function endGame(){
	var gameSquares = getGameTable().gameTable.getElementsByTagName('td');
	for(var i=0; i<gameSquares.length; i++){
		if(gameSquares[i].className == 'gamesquare'){
			var gameSquareObj = new gameSquare(gameSquares[i]);
			gameSquareObj.deactivateSquare();
			gameSquareObj.changeImg('unchosen');
		} else if(gameSquares[i].id.substr(0,6) == 'square'){
			var gameSquareObj = new gameSquare(gameSquares[i]);
			gameSquareObj.deactivateSquare();
		}
	}
}

function displayStatusInGame(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var onBoardStatus = document.getElementById('onboardstatus');
	if(getGameTable().gameTable.offsetTop <= scrollTop - document.getElementById('gameSection').offsetTop && getClicks() > 0){
		onBoardStatus.style.display = 'block';
		onBoardStatus.innerHTML = getClicks()+'/'+getGameTable().squareAmount;
	} else {
		onBoardStatus.style.display = 'none';
	}
}

function displayStatus(){
	document.getElementById('clickeddisplay').innerText = (getGameTable().squareAmount - getClicks()) +' of '+getGameTable().squareAmount;
	if(getClickedSquare().correctSquare){
		document.getElementById('founddisplay').style.display = 'block';
		document.getElementById('notfounddisplay').style.display = 'none';
	} else {
		document.getElementById('founddisplay').style.display = 'none';
		document.getElementById('notfounddisplay').style.display = 'block';
	}
	document.getElementById('incorrectdisplay').innerText = getIncorrectClicks()+' of '+(getGameTable().squareAmount-1);
	displayStatusInGame();
}

function checkSquare(){
	if(getClickedSquare().correctSquare){
		correctClicksAdd1();
		displayStatus();
		endGame();
	} else {
		incorrectClicksAdd1();
		displayStatus();
	}
	getClickedSquare().setId('');
	getClickedSquare().deactivateSquare();
	setClickedSquare(null);
}