window.onload = init;
function init()
{
var button = document.getElementById("addButton");
var but2= document.getElementById("addSButton");
button.onclick = handleButtonClicked;
but2.onclick = TransferandleClicked;
}
function handleButtonClicked()
{
	var textSong = document.getElementById("songTextInput");
	var songName = textSong.value;
	if(songName == "")
	{
		alert("You must enter the song name");
	}
	else
	{
		var li = document.createElement("P");
		li.innerHTML = songName;
		var ul = document.getElementById("inner-div");
		ul.appendChild(li);
	
	}
	
}
function TransferandleClicked()
{
    var textSong = document.getElementById("TextInput");
	var songName = textSong.value;
	if(songName == "")
	{
		alert("You must enter the song name");
	}
	else
	{
		var li2 = document.createElement("P2");
		li2.innerHTML = songName;
		var ul = document.getElementById("inner-div");
		ul.appendChild(li2);
		document.getElementById("li2").style.right = "300px";
		
	
	}
}
function join()
{
	var textNickname = document.getElementById("nickname");
	var nickname = textNickname.value;
	document.location.href= "index.html";
	
}