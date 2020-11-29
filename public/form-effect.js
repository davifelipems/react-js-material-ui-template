const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	console.log("remove!!");
	let parent = this.parentNode.parentNode;
	if(this.value === ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	console.log("Queisso!?");
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
